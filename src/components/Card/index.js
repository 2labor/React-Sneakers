import React, { useState,useContext } from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'

import AppContext from '../../context';

const Card = ({ 
  id,
  onFavorite, 
  title, 
  imageUrl,
  price,
  onPlus,
  favorited = false, 
  loading = false 
}) => {

  const { isItemAdded } = useContext(AppContext)
  const { isItemFavorited } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited);
  const itemInfo = { id, parentId: id, title, imageUrl, price } 



  const onClickPlus = () => {
    onPlus(itemInfo);
  };

  const onClickFavorite = () => {
    onFavorite(itemInfo);
    setIsFavorite(!isFavorite);
  };

  return ( 
    
  <div className={styles.card}>
    {
    loading ? (
      <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
    ) : (
      <>
        <div className={styles.favorite}>
        {onFavorite &&
          <img onClick={onClickFavorite} 
          src={(isItemFavorited(id)) ? "/img/liked.svg" : "/img/unliked.svg"}/>}
        </div>
          <img width={133} height={112} src={imageUrl} alt="" /> 
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{price} руб.</b>
        </div>
         {onPlus && <img className={styles.plus}
          onClick={onClickPlus} 
          src={isItemAdded(id) ? "/img/btn-checked.svg" : "./img/btn-plus.svg"} 
          alt=""/>}
        </div>
      </>
    )
  }
  </div> 
  );
}
 
export default Card;