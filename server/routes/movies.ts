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

export default router
