import React from 'react'
import Filter from '../components/Filter'
import Menu from '../components/Menu'
import Pagination from '../components/Pagination';

export default function Home(props) {
  
  if (props.loading) {
    return <div>loading...</div>;
  }
  
  return (
    <div className="px-[9rem]">
      <h1 className="text-6xl">Menu</h1>
      <div className="grid grid-cols-3">
        <Filter />
        <Menu
          products={props.products}
          cart={props.cart}
          cartProduct={props.cartProduct}
        />
      </div>
      < Pagination Npages={props.Npages} currentPage={props.currentPage} />
    </div>
  );
}
