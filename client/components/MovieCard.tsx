import { Movie } from '../../models/movie'

export default function MovieCard({
  movie,
  onEdit,
}: {
  movie: Movie
  onEdit: (movie: Movie) => void
}) {
  return (
    <div className="movie-card">
      <div className="movie-card-content">
        <h2 className="movie-card-location-description">{movie.name}</h2>
        <h3 className="movie-card-title">{movie.genre}</h3>
        <p className="movie-card-description">
          {movie.done ? 'Completed' : 'Not Completed'}
        </p>
        <div className="actions">
          <button className="movie-card-button" onClick={() => onEdit(movie)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
