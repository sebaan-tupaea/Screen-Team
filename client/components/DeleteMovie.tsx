import React from 'react'

interface DeleteMovieProps {
  movieId: number
  onDeleteSuccess: (movieId: number) => void
}

const DeleteMovie: React.FC<DeleteMovieProps> = ({ movieId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/movies/${movieId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onDeleteSuccess(movieId)
      } else {
        console.error('Error deleting movie')
      }
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeleteMovie