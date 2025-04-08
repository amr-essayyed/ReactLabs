import "./style.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";

function App() {
  console.log("\n👇🏻Rendering App compnnt");
  const padding = 7;
  let userId = 1 // for now

  // states & data
  const [userData, setUserData] = useState([]);
  let [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartedProducts, setCartedProducts] = useState([]) // let cartedProducts;
  const [currentPage, setCurrentPage] = useState(1)
  const [Npages, setNpages] = useState(0);

  useEffect(() => {
    console.log("\n👇🏻start EFFECT");

    setLoading(true);

    (async () => {
      // fetch user data
      const {data: fUserData} = await axios.get(`http://localhost:8000/users/${userId}`)
      setUserData(fUserData);
      console.log("⬇️fetched userData: ", fUserData);
      
      // fetch product data
      const { data: prodData, headers } = await axios.get(`http://localhost:8000/products`);
      // const { data: prodData, headers } = await axios.get(`http://localhost:8000/products?_page=1&_limit=2`);
      const productsCount = headers.get("x-total-count");
      setNpages(Math.ceil(productsCount / 2));
      console.log("⬇️productsCount: ", productsCount);
      console.log("⬇️fetched prodData: ", prodData);
      
      setProducts(prodData);
      
      // build carted product data
      const tempCartedProducts = [];
      const userCart  = fUserData.cart
      for (let id in userCart) {
        const count = userCart[id];
        const prdNdx = prodData.findIndex((prd) => prd.id == id);
        tempCartedProducts.push({ ...prodData[prdNdx], carted: count });
      }

      console.log("⬇️fetched tempCartedProducts: ", tempCartedProducts);
      setCartedProducts(tempCartedProducts);
      
      setLoading(false);
    })();
  }, []);

  // useEffect(()=>{console.log("🗝️cartedProducts", cartedProducts);},[cartedProducts]);

  function resetCounts() {
    // setProducts(products.map((prd) => ({ ...prd, carted: 0 })));

    setUserData({ ...userData, cart: {} });
    setCartedProducts([]);
    axios.patch(`http://localhost:8000/users/${userId}`, {cart:{}});
  }

  function incCount(id) {
    const ndx = products.findIndex((itm) => itm.id === id);
    setProducts((currntProducts) =>
      currntProducts.map((itm, i) =>
        i === ndx ? { ...itm, carted: itm.carted + 1 } : itm
      )
    );
  }

  function decCount(id) {
    // setProducts(
    //   products.map((prd) =>
    //     prd.id === id && prd.carted > 0
    //       ? { ...prd, carted: prd.carted - 1 }
    //       : prd
    //   )
    // );

    const tempCartedProducts = [...cartedProducts];
    const userCart = userData.cart;
    const count = userCart[id];

    if(count > 1){
      const tempUserCart = { ...userCart, [id]: count - 1 };
      const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
      tempCartedProducts[crtdPrdNdx].carted = cartedProducts[crtdPrdNdx].carted - 1;
      
      setUserData({ ...userData, cart: tempUserCart });
      setCartedProducts(tempCartedProducts);

      axios.patch(`http://localhost:8000/users/${userId}`, {cart:tempUserCart});
    }else if(count == 1){
      const tempUserCart = { ...userCart}; 
      
      delete tempUserCart[id];
      const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
      tempCartedProducts.splice(crtdPrdNdx, 1);

      setUserData({ ...userData, cart: tempUserCart });
      setCartedProducts(tempCartedProducts);

      axios.patch(`http://localhost:8000/users/${userId}`, {cart:tempUserCart});
    }
    
  }

  function delOrder(id) {
    // setProducts(products.filter((prd) => prd.id !== id));

    const tempCartedProducts = [...cartedProducts];
    const userCart = userData.cart;

    const tempUserCart = { ...userCart };
    delete tempUserCart[id];

    const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
    tempCartedProducts.splice(crtdPrdNdx, 1);

    setUserData({ ...userData, cart: tempUserCart });
    setCartedProducts(tempCartedProducts);

    axios.patch(`http://localhost:8000/users/${userId}`, {cart:tempUserCart});
  }

  function cartProduct(id) {
    console.log("carting: ", id);
    const tempCartedProducts = [...cartedProducts];
    const userCart = userData.cart;
    const count = userCart[id];
    let tempUserCart;
    if (count) {
      // cartedProduct[id].count++
      tempUserCart = {...userCart, [id]:count+1}
      const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
      tempCartedProducts[crtdPrdNdx].carted = cartedProducts[crtdPrdNdx].carted + 1;
    } else {
      // cartedProduct.add(product(id))
      tempUserCart = { ...userCart, [id]: 1 };
      const prdNdx = products.findIndex((prd) => prd.id == id);
      tempCartedProducts.push({ ...products[prdNdx], carted: 1 });
    }
    
    // const tempUserData = { ...userData, cart: tempUserCart };
    setUserData({ ...userData, cart: tempUserCart });
    setCartedProducts(tempCartedProducts);

    // axios.put(`http://localhost:8000/users/${userId}`, tempUserData);
    axios.patch(`http://localhost:8000/users/${userId}`, {cart:tempUserCart});
    // const tempProducts = products.map((itm) =>
    //   itm.id == id ? { ...itm, carted: itm.carted + 1 } : itm
    // );
    // setProducts(tempProducts);
  }


  function turnPage(number) {

  }

  return (
    <>
      <Navbar pad={padding} cartCount={cartedProducts?.length || 0} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex w-full  h-screen items-center justify-center text-9xl">
              Welcome
            </div>
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              pad={padding}
              cartedProducts={cartedProducts}
              incCount={cartProduct}
              decCount={decCount}
              delOrder={delOrder}
              resetCounts={resetCounts}
              loading={loading}
            />
          }
        />

        <Route
          path="/home"
          element={
            <Home
              products={products}
              cart={userData.cart}
              Npages={Npages}
              currentPage={currentPage}
              cartProduct={cartProduct}
              loading={loading}
            />
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
