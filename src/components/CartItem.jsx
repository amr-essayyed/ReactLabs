import React from 'react'
import '../style.css'

export default function CartItem(prop){
    // const [count, setCount] = React.useState(prop.count);

   

    return (
        <tr className="">
            <td>{prop.id}</td>
            <td>{prop.name}</td>
            <td>{prop.count}</td>
            <td><button onClick={()=>prop.incCount(prop.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">+</button></td>
            <td><button onClick={()=>prop.decCount(prop.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">-</button></td>
            <td><button onClick={()=>prop.delOrder(prop.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">x</button></td>
        </tr>

    )
}