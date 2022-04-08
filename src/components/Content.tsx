import { memo } from 'react'

import { MovieProps } from '../App'
import { MovieCard } from './MovieCard'
import { GenreResponseProps } from './SideBar'

import '../styles/content.scss'

interface ContentProps {
  selectedGenre: GenreResponseProps
  movies: MovieProps[]
}

const ContentBase = ({ selectedGenre, movies }: ContentProps) => {
  return (
    <div className='container'>
      <header>
        <span className='category'>
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className='movies-list'>
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export const Content = memo(ContentBase, (prevProps, nextProps) => {
  return Object.is(prevProps.selectedGenre, nextProps.selectedGenre)
})
