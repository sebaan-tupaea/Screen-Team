import connection from './connection.ts'
import { Movie } from '../../models/movie.ts'

export async function getAllMovies(db = connection): Promise<Movie[]> {
  return db('movies').select()
}
