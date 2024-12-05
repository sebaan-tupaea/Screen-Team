import connection from './connection.ts'
import { Movie } from '../../models/movie.ts'

export async function getAllMovies(db = connection): Promise<Movie[]> {
  return db('movies').select()
}

export async function getMovieById(
  id: number,
  db = connection,
): Promise<Movie> {
  const movie = await db('movies')
    .where({ id })
    .select('id', 'name', 'genre', 'done')
    .first()

  return movie as Movie
}
