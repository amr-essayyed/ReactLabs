import React from 'react'
import AdminItem from './AdminItem'
import { NavLink } from 'react-router';
import Pagination from '../components/Pagination';

export default function Admin(props) {
  return (
    <div className="px-20">
      <h1 className="text-9xl">Admin</h1>
      <NavLink  to="/addproduct" className="flex justify-end mr-37">
        <button className="btn btn-accent text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </NavLink>
      <div className="col-span-2">
        <table className="table-auto w-full text-4xl table table-zebra">
          <thead className="text-left">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{
            props.products.map((itm) => (
                <AdminItem
                  product={itm}
                  key={itm.id}
                  id={itm.id}
                  pic={itm.thumbnail}
                  name={itm.title}
                  price={itm.price}
                  hndlEditProduct={props.hndlEditProduct}
                  hndlDeleteProduct={props.hndlDeleteProduct}
                />
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        Npages={props.Npages}
        currentPage={props.currentPage}
        turnPage={props.turnPage}
      />
\
    </div>
  );
}

