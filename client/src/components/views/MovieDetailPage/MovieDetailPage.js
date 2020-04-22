import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCard from '../LandingPage/Sections/GridCard';
import { Descriptions, Button, Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState([]);
  const [crews, setCrews] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((res) => res.json())
          .then((res) => setCrews(res.cast));
      });
  }, []);

  const handleClick = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div>
      {movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite
            userFrom={localStorage.getItem('userId')}
            movieId={movieId}
            movieInfo={movie}
          />
        </div>

        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">
            {movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="release_date">
            {movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="vote_average" apsn={2}>
            {movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label="vote_count">
            {movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
          <Descriptions.Item label="popularity">
            {movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClick}> Toggle Actor View</Button>
        </div>
        <br />
        {actorToggle && (
          <Row gutter={[16, 16]}>
            {crews &&
              crews.map((crew, i) => (
                <React.Fragment key={i}>
                  {crew.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500${crew.profile_path}`}
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
