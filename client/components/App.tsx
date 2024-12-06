import { useState } from 'react'
import { Movie } from '../../models/movie'
import AddMovieForm from './AddMovieForm'
import EditMovie from './EditMovie'
import MoviesList from './MoviesList'

function App() {
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

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
              <AddMovieForm
                onMovieAdded={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
              <MoviesList onEdit={handleEditClick} />
            </>
          )}
        </section>
      </div>
    </>
  )
}

export default App
