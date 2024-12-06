import request from 'superagent'
import { Movie, MovieData } from '../../models/movie'

const rootURL = '/api/v1/movies'

export async function getAllMovies(): Promise<Movie[]> {
  const res = await request.get(rootURL)
  return res.body
}

export async function getAllMoviesById(id: number): Promise<Movie> {
  const res = await request.get(`${rootURL}/${id}`)
  return res.body
}

export async function addNewMovie(newMovie: MovieData) {
  await request.post(rootURL).send(newMovie)
}

export async function deleteMovie(id: number) {
  await request.del(`${rootURL}/${id}`).then((res) => res)
}

export async function updateMovie(
  id: number,
  updatedMovie: MovieData,
): Promise<Movie> {
  const response = await request.patch(`${rootURL}/${id}`).send(updatedMovie)
  return response.body as Movie
}
