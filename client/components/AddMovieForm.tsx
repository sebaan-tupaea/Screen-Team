import { useState } from 'react'

function AddMovieForm({ onMovieAdded }: { onMovieAdded: () => void }) {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const newMovie = { name, genre, done }

    try {
      const response = await fetch('/api/v1/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      })

      if (response.ok) {
        onMovieAdded() //refresh the movie list
        setName('')
        setGenre('')
        setDone(false)
      } else {
        console.error('Failed to add movie')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Movie Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter movie name"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Finished:
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">Add Movie</button>
    </form>
  )
}

export default AddMovieForm
