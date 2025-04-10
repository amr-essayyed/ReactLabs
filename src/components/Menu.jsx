import React, { useContext } from 'react'
import MenuItem from './MenuItem'
import { globalContext } from '../App'

export default function Menu(props) {
    const {selectedCategory} = useContext(globalContext);

  return (
    <div className="col-span-2">
        <table className="table-auto w-full text-4xl table table-zebra">
            <thead className="text-left">
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.products.filter(prd=>{
                        return selectedCategory?
                         prd.category===selectedCategory.slug
                        : true
                    })
                    .map(
                        itm => 
                            <MenuItem 
                                key={itm.id} id={itm.id} pic={itm.thumbnail} name={itm.title} price={itm.price} 
                                carted={props.cart.findIndex((cp)=>cp.id == itm.id)==-1? 0:props.cart.find(cp=>cp.id==itm.id).carted}  
                                cartProduct={props.cartProduct} 
                            />
                    )
                }
            </tbody>
        </table>
    </div>
  )
}
