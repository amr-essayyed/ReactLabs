import React, { useContext } from 'react'
import Filter from '../components/Filter'
import Menu from '../components/Menu'
import Pagination from '../components/Pagination';
import { globalContext } from '../App';

export default function Home(props) {
  console.log("rendering home: 🟢");

  const {searchProducts, refInput} = useContext(globalContext)

  if (props.loading) {
    return <div>loading...</div>;
  }
  
  return (
    <div className="px-[9rem]">
      <h1 className="text-6xl">Menu</h1>
      <div className="flex place-content-center mb-4"><input type="search" placeholder="search" className="input input-accent" ref={refInput} onChange={searchProducts} /></div>
      <div className="grid grid-cols-3">
        <Filter />
        <Menu
          products={props.products}
          cart={props.cart}
          cartProduct={props.cartProduct}
        />
      </div>
      <Pagination
        Npages={props.Npages}
        currentPage={props.currentPage}
        turnPage={props.turnPage}
      />
    </div>
  );
}
