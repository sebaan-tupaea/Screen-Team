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

export async function updateMovie(
  updatedMovie: Movie,
  db = connection,
): Promise<Movie> {
  const { id, name, genre, done } = updatedMovie

  await db('movies').where({ id }).update({
    name,
    genre,
    done,
  })
  const updatedRecord = await db('movies').select('*').where({ id }).first()
  return updatedRecord as Movie
}

export async function updateMovieDone(
  id: number,
  done: boolean,
  db = connection,
): Promise<void> {
  await db('movies').where({ id }).update('done', done)
}

export async function deleteMovie(id: number, db = connection) {
  await db('movies').where({ id }).del()
}
