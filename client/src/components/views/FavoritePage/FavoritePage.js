import React, { useEffect, useState } from 'react';
import './favorite.css';
import axios from 'axios';
import { IMAGE_URL } from '../../Config';
import { Popover } from 'antd';

function FavoritePage() {
  const [favoritedMovies, setFavoritedMovies] = useState([]);

  const variables = { userFrom: localStorage.getItem('userId') };

  useEffect(() => {
    fetchFavoritedMovies();
  }, []);

  const fetchFavoritedMovies = () => {
    axios.post('/api/favorite/getFavoritedMovie', variables).then((res) => {
      if (res.data.success) {
        setFavoritedMovies(res.data.favorites);
        console.log(res.data.favorites);
      } else {
        alert('Failed to get favorited movies');
      }
    });
  };

  const onClickRemove = (movieId) => {
    const variable = {
      movieId: movieId,
      userFrom: localStorage.getItem('userId'),
    };

    axios.post('/api/favorite/removeFromFavorite', variable).then((res) => {
      if (res.data.success) {
        fetchFavoritedMovies();
      } else {
        alert(' Failed to remove from Favorites');
      }
    });
  };

  const renderTableBody = favoritedMovies.map((movie, i) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img
            src={`${IMAGE_URL}w500${movie.moviePost}`}
            alt={movie.moviePost}
          />
        ) : (
          'No Image'
        )}
      </div>
    );

    return (
      <tr key={i}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <button onClick={() => onClickRemove(movie.movieId)}>
            Remove from Favorites
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <h3>Favorite Movies By Me</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie RunTime</th>
              <td>Remove from favorites</td>
            </tr>
          </thead>
          <tbody>{renderTableBody}</tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoritePage;
