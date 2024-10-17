import { useContext, useState } from "react";
import Info from "./info";
import axios from "axios";

import AppContext from "../context";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

const Drawer = ({ onClose, items = [], onRemove }) => {

  const { cartItems, setCartItems } = useContext(AppContext)
  const [orderId, setOrderId] = useState(null)
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)

  const totalPrice = cartItems.reduce((sum, obj) => sum + (+obj.price), 0)

  const onClickOrder = async () => {
    try {
      const {data} = await axios.post('https://670c9c6d7e5a228ec1d0d17b.mockapi.io/Orders', {
        items: cartItems
      });
    setOrderId(data.id)
    setIsOrderCompleted(true);
    setCartItems([])

    for(let item of cartItems) {
      axios.delete(`https://67077efba0e04071d22a930a.mockapi.io/cart/${item.id}`)
      await delay(1000);
    }

  } catch(error){
      alert('Ошибка в оформлении заказа!')
    }
  }
  
  return ( 
    
    <div className="overlay">
      <div className="drawer">
            <h2 className="d-flex mb-30 justify-between">
              Корзина
              <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove"/>
            </h2>

          {
            items.length > 0  
            ? 
            <div className="d-flex flex-column flex">
              <div className="items">
              {items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20">
                <img  className="mr-20" src={obj.imageUrl} alt="Sneakers" width={70} height={70}/>
                <div className="mr-20">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                  <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
              </div>
                ))}
              </div> 
              <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{Math.round(totalPrice / 100 * 5)} руб. </b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img src="/img/arrow.svg" alt="Arrow"/>
              </button>
            </div>
            </div>
            : (
              <Info 
              title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              imageUrl={isOrderCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} />
            )}
        </div>
    </div>
   );
}
 
export default Drawer;