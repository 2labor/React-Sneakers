import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";
import Info from "../components/info";


const Favorites = () => {
  const { favorites, onAddToFavorites } = useContext(AppContext)

  return ( 
    <div className="content p-40">
    <div className="d-flex align-center mb-40 justify-between"></div>
    <h1>Мои закладки</h1>

  {console.log(favorites)}

    {favorites.length == 0 ? <Info 
    imageUrl="/img/pin-empty.svg" 
    title="Закладок нет :(" 
    description="Вы ничего не добавляли в закладки"
    onMain={true}
    /> : <div className="d-flex flex-wrap">
      {favorites.map((item) => ( 
        <Card
        key={item.id}
        onFavorite ={(obj) => onAddToFavorites(obj)}
        favorited={true}
        {...item}
        />
        ))}
    </div>}

  </div>
   );
}
 
export default Favorites;