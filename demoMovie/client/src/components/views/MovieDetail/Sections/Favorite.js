import React, { useEffect,useState } from 'react';
import Axios from 'axios'


function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const mvoieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(()=>{
        let variables ={
            userFrom,
            movieId
        }
        //fetch를 쓸수도 있고  Axios를 쓸수도 있다.
        Axios.post('/api/favorite/favoriteNumber',variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패 했습니다.')
            }
        })

        Axios.post('/api/favorite/favorited',variables)
        .then(response => {
            if(response.data.success) {
                console.log('favorited',response.data)
                setFavorited(response.data.favorited)
            } else {
                alert('정보를 가져오는데 실패 했습니다.')
            }
        })


    },[])

  return (<div>

        <button>{Favorited? "Not Favorited" : "Add to Favorite"} {FavoriteNumber}</button>

  </div>);
}

export default Favorite;
