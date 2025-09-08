'use client'
import { FC } from 'react'

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <header className="h-header relative z-40 flex items-center justify-between bg-transparent px-5 xl:px-10"></header>
  )
}
