import { useCallback, useEffect, useState } from 'react'

import { api } from '../services/api'
import { MovieProps } from '../App'
import { Button } from './Button'

import '../styles/sidebar.scss'

export interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface SideBarProps {
  setMovies: (movies: MovieProps[]) => void
  setSelectedGenre: (genre: GenreResponseProps) => void
}

export function SideBar({ setMovies, setSelectedGenre }: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(response => {
        setMovies(response.data)
      })

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id)
  }, [])

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
