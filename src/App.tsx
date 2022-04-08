import { useState } from 'react'

import { GenreResponseProps, SideBar } from './components/SideBar'
import { Content } from './components/Content'

import './styles/global.scss'

export interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setMovies={setMovies} setSelectedGenre={setSelectedGenre} />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  )
}
