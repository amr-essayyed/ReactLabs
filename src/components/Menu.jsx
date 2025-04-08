import React from 'react'
import MenuItem from './MenuItem'

export default function Menu(props) {
  return (
    <div className="col-span-2">
        <table className="table-auto w-full text-4xl table table-zebra">
            <thead className="text-left">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.products.map(itm => <MenuItem key={itm.id} id={itm.id} name={itm.name} price={itm.price} carted={props.cart[itm.id]==undefined? 0:props.cart[itm.id]}  cartProduct={props.cartProduct} />)
                }
            </tbody>
        </table>
    </div>
  )
}
