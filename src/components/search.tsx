'use client'

import React, { useState } from 'react'
import { Icon } from './icon'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { Routes } from '@/utils/ui/Routes'

export function Search() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!search) return

    router.push(Routes.restaurantsSearch(search))
  }

  return (
    <form className="flex gap-4" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleSearch}
        value={search}
      />
      <Button size="icon" variant="destructive" type="submit">
        <Icon name="SearchIcon" size={20} />
      </Button>
    </form>
  )
}
