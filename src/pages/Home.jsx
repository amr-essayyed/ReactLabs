import React from 'react'
import Filter from '../components/Filter'
import Menu from '../components/Menu'

export default function Home(props) {
  return (
    <>
    <h1 className="text-6xl">Menu</h1>
    <div className="grid grid-cols-3 bg-[red]">
      <Filter />
      <Menu items={props.items} />
    </div>
    </>
  )
}
