import React from 'react'

export default function MenuItem(props) {
  return (
        <tr className="">
            <td>{props.name}</td>
            <td>{props.count}</td>
        </tr>
  )
}
