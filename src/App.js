import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { BrowserRouter as Router ,Route, Routes } from "react-router-dom";
import AppContext from "./context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://67077efba0e04071d22a930a.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://670c9c6d7e5a228ec1d0d17b.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://67077efba0e04071d22a930a.mockapi.io/items');

      setIsLoading(false);
      
      setItems(itemsResponse.data)
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);

    }

    fetchData()
  }, []);

  const onAddToCart = (obj) => {
    try{
      if (cartItems.find((item) => Number(item.parentId) === Number(obj.id))){
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        axios.delete(`https://67077efba0e04071d22a930a.mockapi.io/cart/${obj.id}`)
      } else{
        axios.post('https://67077efba0e04071d22a930a.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      };
    } catch(error) {
      alert('Не удалось добавить товар в корзину')
    };
};

const onAddToFavorites = async (obj) => {
  try {
    if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
      axios.delete(`https://670c9c6d7e5a228ec1d0d17b.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else{
      const { data } = await axios.post('https://670c9c6d7e5a228ec1d0d17b.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }
  } catch (error) {
    alert('Не удалось добавить товар в закладки')
  }
};

const onRemoveItem = (id) => {
  axios.delete(`https://67077efba0e04071d22a930a.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};

const onChangeSearchInput = (event) => {
  setSearchValue(event.target.value);
};

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }
  
  const isItemFavorited = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, isItemFavorited,  onAddToFavorites, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">

        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route 
          path="/"
            element={
            <Home 
            cartItems={cartItems}
            items={items} 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
            onChangeSearchInput={onChangeSearchInput}
            isLoading={isLoading}
            />}
            >
          </Route>

          <Route path="/favorite" element={
            <Favorites/>}>
          </Route>

          <Route path="/orders" element={
              <Orders/>}>
          </Route>

        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
