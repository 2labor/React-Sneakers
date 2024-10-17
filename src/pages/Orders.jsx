import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import App from "../App";
import AppContext from "../context";
import Info from "../components/info";

const Orders = () => {

const {onAddToFavorites, onAddToCart } = useContext(AppContext)
const [orders, setOrders] = useState([]); 
const [isLoading, setIsLoading] = useState(true)


useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get('https://670c9c6d7e5a228ec1d0d17b.mockapi.io/Orders');
    setOrders(data.map((obj) => obj.items).flat())
    setIsLoading(false)
    } catch(error) {
      alert('Ошибка при запросе заказов!')
    }
  })();
}, [])

  return ( 
    <div className="content p-40">
    <div className="d-flex align-center mb-40 justify-between"></div>
    <h1>Мои заказы</h1>

    <div className="d-flex flex-wrap">
      {orders.length == 0 ? 
      <Info 
      imageUrl="/img/orders-empty.svg" 
      title="У вас нет заказов" 
      description="Вы нищеброд? Оформите хотя бы один заказ."
      onMain={true}
      />
      : (isLoading ? [...Array(8)] : orders).map((item) => ( 
        <Card
          key={item && item.id}
          loading={isLoading}
          {...item}
        />
        ))}
    </div>

  </div>
   );
}
 
export default Orders;