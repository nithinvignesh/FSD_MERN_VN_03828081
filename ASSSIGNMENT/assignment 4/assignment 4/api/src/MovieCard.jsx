const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />

      <h3>{movie.title}</h3>

      <p><strong>Release Year:</strong> {movie.release_date}</p>
      <p><strong>Director:</strong> {movie.director}</p>

      <p className="description">
        {movie.description.slice(0, 100)}...
      </p>
    </div>
  );
};

export default MovieCard;