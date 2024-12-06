import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMovie, deleteMovie } from '../apis/apiClient'
import { Movie, MovieData } from '../../models/movie'

interface EditMovieProps {
  movie: Movie
  onCancel: () => void
}

export default function EditMovie({ movie, onCancel }: EditMovieProps) {
  const [editedMovie, setEditedMovie] = useState<Movie>(movie)
  const queryClient = useQueryClient()

  const editMutation = useMutation<
    Movie,
    Error,
    { id: number; updatedMovie: MovieData }
  >({
    mutationFn: ({ id, updatedMovie }) => updateMovie(id, updatedMovie),
    onSuccess: (updatedMovie) => {
      queryClient.setQueryData(['movies'], (oldMovies: Movie[] | undefined) => {
        if (!oldMovies) return []
        return oldMovies.map((t) =>
          t.id === updatedMovie.id ? updatedMovie : t,
        )
      })
      onCancel()
    },
  })

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (id) => deleteMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      onCancel()
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedMovie((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editMutation.mutate({ id: editedMovie.id, updatedMovie: editedMovie })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMutation.mutate(editedMovie.id)
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-card-content">
        <h2 className="movie-card-name">Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name-label">Name: </label>
            <input
              id="name-label"
              name="name"
              value={editedMovie.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="genre-label">Genre</label>
            <input
              id="genre-label"
              className="genre-card-description"
              name="genre"
              value={editedMovie.genre}
              onChange={handleChange}
              placeholder="Enter genre"
            />
          </div>
          <div className="buttons">
            <button
              className="movie-card-button"
              type="submit"
              disabled={editMutation.isPending}
            >
              {editMutation.isPending ? 'Saving...' : 'Save'}
            </button>

            <button
              className="movie-card-button cancel-button"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className="movie-card-button delete-button"
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
