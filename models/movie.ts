export interface MovieData {
  name: string
  genre: string
  done: boolean
}

export interface Movie extends MovieData {
  id: number
}
