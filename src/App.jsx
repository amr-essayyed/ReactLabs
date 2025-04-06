import './style.css'
import { useState } from 'react'
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import Error from './pages/Error'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const padding = 7;

  const [products, setProducts] = useState(
    [
      {id:1, name: "water", count: 0},
      {id:2, name: "burger", count: 2}, 
      {id:3, name: "potato", count:1}
    ]
  )

  function resetCounts(){
    setProducts(products.map((ord)=>{ord.count=0; return ord}))
  }

  function incCount(id){
    // setOrders((currProducts)=>currProducts.map(ord=>{if(ord.id === id) ord.count++; return ord}));
    // find product by id
    const ndx = products.findIndex((itm)=> itm.id === id)
    // 
    // const newProducts = [...products]
    // console.log(newProducts[ndx])
    // newProducts[ndx].count++ 
    // setProducts((currntProducts)=>{currntProducts[ndx].count++; return currntProducts})
    setProducts( (currntProducts)=> currntProducts.map( (itm, i) => i===ndx? {...itm, count: itm.count+1 } :itm ) )
    console.log(products[ndx])
  }

  function decCount(id){
    setProducts(products.map(ord=>{if(ord.id === id && ord.count>0) ord.count--; return ord}));
  }

  function delOrder(id){
    setProducts(products.filter((ord)=>ord.id !==id))
  }

  return (
    <>
      <Navbar pad={padding} cartCount={products.length} />
      <Routes>
        <Route path='/cart' element={<Cart pad={padding} orders={products} incCount={incCount} decCount={decCount} delOrder={delOrder} resetCounts={resetCounts}/>} />
        <Route path='/home' element={ <Home items={products} /> } />
        <Route path='*' element={ <Error /> } />
      </Routes>
    </>
  )
}

export default App
