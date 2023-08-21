import { MovieEntity } from '../../domain/entities/MovieEntity'

export class MovieModel implements MovieEntity {
  id: number
  title: string
  overview: string
  poster_path: string

  constructor({
    id,
    title,
    overview,
    poster_path,
  }: {
    id: number
    title: string
    overview: string
    poster_path: string
  }) {
    this.id = id
    this.title = title
    this.overview = overview
    this.poster_path = poster_path
  }

  fromJson = (): MovieEntity => ({
    id: this.id,
    title: this.title,
    overview: this.overview,
    poster_path: this.poster_path,
  })
}
