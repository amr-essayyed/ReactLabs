import React from 'react'
import MenuItem from './MenuItem'

export default function Menu(probs) {
  return (
    <div className="col-span-2">
        <table className="table-auto w-full text-4xl ">
            <thead className="text-left">
                <tr>
                    <th>Name</th>
                    <th>stock</th>
                </tr>
            </thead>
            <tbody>
                {
                    probs.items.map(itm => <MenuItem key={itm.id} id={itm.id} name={itm.name} count={itm.count} />)
                }
            </tbody>
        </table>
    </div>
  )
}
