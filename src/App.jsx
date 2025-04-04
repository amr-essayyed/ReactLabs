import './style.css'
import { useState } from 'react'
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const padding = 7;

  const [orders, setOrders] = useState(
    [
      {id:1, name: "water", count: 0},
      {id:2, name: "burger", count: 2}, 
      {id:3, name: "potato", count:1}
    ]
  )

  function resetCounts(){
    setOrders(orders.map((ord)=>{ord.count=0; return ord}))
  }

  function incCount(id){
    setOrders(orders.map(ord=>{if(ord.id === id) ord.count++; return ord}));
  }

  function decCount(id){
    setOrders(orders.map(ord=>{if(ord.id === id && ord.count>0) ord.count--; return ord}));
  }

  function delOrder(id){
    setOrders(orders.filter((ord)=>ord.id !==id))
  }

  return (
    <>
      <Navbar pad={padding} cartCount={orders.length} />
      <Routes>
         <Route path="/cart" element={<Cart pad={padding} orders={orders} incCount={incCount} decCount={decCount} delOrder={delOrder} resetCounts={resetCounts}/>} />
         <Route path='/home' element={ <h1 className="p-7 text-9xl">Home</h1> } />
      </Routes>
    </>
  )
}

export default App
