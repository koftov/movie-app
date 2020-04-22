import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variable).then((res) => {
      if (res.data.success) {
        setFavoriteNumber(res.data.favoriteNumber);
      } else {
        alert('Falied to get favoriteNumber');
      }
    });

    axios.post('/api/favorite/favorited', variable).then((res) => {
      if (res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        alert('Falied to get Favorite Info');
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      axios.post('/api/favorite/removeFromFavorite', variable).then((res) => {
        if (res.data.success) {
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          }
        } else {
          alert(' Failed to remove from Favorites');
        }
      });
    } else {
      axios.post('/api/favorite/addToFavorite', variable).then((res) => {
        if (res.data.success) {
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          }
        } else {
          alert(' Failed to add to Favorites');
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? ' Remove from Favorite ' : ' Add to Favorite '}
        {FavoriteNumber}{' '}
      </Button>
    </div>
  );
}

export default Favorite;
