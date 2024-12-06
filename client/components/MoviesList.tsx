import { useQuery } from '@tanstack/react-query'
import { getAllMovies } from '../apis/apiClient'
import { Movie } from '../../models/movie'
import MovieCard from './MovieCard'

export default function MoviesList({
  onEdit,
}: {
  onEdit: (movie: Movie) => void
}) {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: getAllMovies,
  })

  if (isError) {
    return (
      <p className="error-message">An error occurred while fetching movies.</p>
    )
  }

  if (isLoading) {
    return <p className="loading-message">Loading movies...</p>
  }

  if (!movies || movies.length === 0) {
    return <p className="error-message">No movies found.</p>
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onEdit={onEdit} />
      ))}
    </div>
  )
}
