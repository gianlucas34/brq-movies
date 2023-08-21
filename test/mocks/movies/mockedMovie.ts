import { MovieModel } from '../../../src/app/infra/models/MovieModel'

export const mockedMovie = new MovieModel({
  id: 832502,
  title: 'The Monkey King',
  overview:
    'A stick-wielding monkey teams with a young girl on an epic quest for immortality, battling demons, dragons, gods — and his own ego — along the way.',
  poster_path: '/i6ye8ueFhVE5pXatgyRrZ83LBD8.jpg',
}).fromJson()
