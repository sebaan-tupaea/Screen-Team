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

export async function addMovie(
  { name, genre, done }: { name: string; genre: string; done: boolean },
  db = connection,
): Promise<Movie> {
  const [newMovie] = await db('movies')
    .insert({ name, genre, done })
    .returning(['id', 'name', 'genre', 'done'])

  return newMovie
}

export async function deleteMovie(id: number, db = connection): Promise<Movie | null> {
  const [deletedMovie] = await db('movies')
    .where({ id })
    .del()
    .returning(['id', 'name', 'genre', 'done'])

  return deletedMovie || null
}
