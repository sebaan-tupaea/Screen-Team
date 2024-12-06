import { Router } from 'express'

import * as db from '../db/movies.ts'

const router = Router()

// GET 'api/v1/movies'
router.get('/', async (req, res) => {
  try {
    const movies = await db.getAllMovies()

    res.json(movies)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET 'api/v1/movies/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  try {
    const movie = await db.getMovieById(id)
    if (!movie) return res.status(404).json({ error: 'Movie not found' })
    res.json(movie)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to fetch movie' })
  }
})

// POST 'api/v1/movies'
router.post('/', async (req, res) => {
  const { name, genre, done } = req.body

  //validate data
  if (!name || !genre || done === undefined) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    //add movie to database
    const newMovie = await db.addMovie({ name, genre, done })

    res.status(201).json(newMovie)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to add movie' })
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const deletedMovie = await db.deleteMovie(id)
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.json({ message: 'Movie deleted successfully' })
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to delete movie' })
  }
})

export default router
