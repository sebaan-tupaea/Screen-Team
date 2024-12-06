import React from 'react'

//2-When deleting a movie, a message appears (Are you sure you want to delete this movie?), I click ok and the message that it was deleted successfully does not appear either, and then the screen remains the same as it was, it does not change. And the movie is deleted.
interface DeleteMovieProps {
  movieId: number
  onDeleteSuccess: (movieId: number) => void
}

const DeleteMovie: React.FC<DeleteMovieProps> = ({
  movieId,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/movies/${movieId}`, {
        method: 'DELETE',
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

  return <button onClick={handleDelete}>Delete</button>
}

export default DeleteMovie
