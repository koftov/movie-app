import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';

import MainImage from './Sections/MainImage';
import { Typography, Row } from 'antd';
import GridCard from './Sections/GridCard';
const { Title } = Typography;

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovies([...movies, ...res.results]);
        setCurrentPage(res.page);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: '100%', margin: 0 }}>
      {movies[0] && (
        <MainImage
          image={`${IMAGE_URL}w1280${movies[0].backdrop_path}`}
          title={movies[0].original_title}
          text={movies[0].overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <Title level={2}> Movies by latest</Title>
        <hr />
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie, i) => (
              <React.Fragment key={i}>
                <GridCard
                  image={
                    movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>

        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleClick}> Load More </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
