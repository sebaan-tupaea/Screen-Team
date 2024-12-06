import { useState } from 'react'
import { Movie } from '../../models/movie'
import AddMovieForm from './AddMovieForm'
import EditMovie from './EditMovie'
import MoviesList from './MoviesList'

import { useQueryClient } from '@tanstack/react-query'

function App() {
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const queryClient = useQueryClient()

  const handleMovieAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] })
  }

  const handleEditClick = (movie: Movie) => {
    setEditingMovie(movie)
  }

  const handleCancelEdit = () => {
    setEditingMovie(null)
  }

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Movies!</h1>
        <section className="main">
          {editingMovie ? (
            <EditMovie movie={editingMovie} onCancel={handleCancelEdit} />
          ) : (
            <>
              <AddMovieForm onMovieAdded={handleMovieAdded} />
              <MoviesList onEdit={handleEditClick} />
            </>
          )}
        </section>
      </div>
    </>
  )
}

export default App
