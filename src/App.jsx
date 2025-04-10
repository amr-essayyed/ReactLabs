import "./style.css";
import { useEffect, useState, createContext, useRef } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import axios from "axios";
import EditProduct from "./pages/EditProduct";
import AddProduct from './pages/AddProduct'
import { useNavigate } from "react-router";

export const globalContext = createContext({})

function App() {
  console.log("\n👇🏻Rendering App compnnt");
  const padding = 7;
  let userId = 1 // for now
  const pageLimit = 10;
  // states & data
  const [userData, setUserData] = useState([]);
  let   [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartedProducts, setCartedProducts] = useState([]) // let cartedProducts;
  const [currentPage, setCurrentPage] = useState(1)
  const [Npages, setNpages] = useState(0);
  const [categories, setCategories] = useState([])
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const refInput = useRef();
  const [searchWord, setSearchWord] = useState("");
  let navigate = useNavigate();

  console.log("products: ", products);
  const selectedCategory = categories.find((category) => category.slug == selectedCategorySlug);
  // console.log("🟡selectedCategory: ", selectedCategory);
  // const filteredProducts = products.filter((prd) => prd.category === selectedCategorySlug) || products;
  // console.log("🟡filteredProducts: ", filteredProducts);
  const searchedProducts = products.filter((prd)=> (prd.title||"").toLowerCase().includes((searchWord||"").toLowerCase())) || products;  

  useEffect(() => {
    console.log("\n👇🏻start EFFECT");

    setLoading(true);

    (async () => {
      // fetch user data
      const {data: fUserData} = await axios.get(`http://localhost:3000/users/${userId}`)
      setUserData(fUserData);
      // console.log("⬇️fetched userData: ", fUserData);
      
      // fetch product data
      // const { data: prodData, headers } = await axios.get(`http://localhost:3000/products`);
      const { data: prodData, headers } = await axios.get(`http://localhost:3000/products?_page=1&_limit=${pageLimit}`);
      const productsCount = headers.get("x-total-count");
      setNpages(Math.ceil(productsCount / pageLimit));
      // console.log("⬇️productsCount: ", productsCount);
      // console.log("⬇️fetched prodData: ", prodData);
      
      setProducts(prodData);
      
      //! fetch carted product data
      const {data:tempUserCart} = await axios.get(`http://localhost:3000/carts/${userId}`);
      const tempCartedProducts = tempUserCart.products;
      // const tempCartedProducts = [];
      // const userCart  = fUserData.cart
      // for (let id in userCart) {
      //   const count = userCart[id];
      //   const prdNdx = prodData.findIndex((prd) => prd.id == id);
      //   tempCartedProducts.push({ ...prodData[prdNdx], carted: count });
      // }

      // console.log("⬇️fetched tempCartedProducts: ", tempCartedProducts);
      setCartedProducts(tempCartedProducts);
      
      const {data:tempCategories} = await axios.get(`http://localhost:3000/categories`);
      setCategories(tempCategories);
        // console.log("🟡 categories", tempCategories);

      setLoading(false);
    })();
  }, []);

  // useEffect(()=>{console.log("🗝️cartedProducts", cartedProducts);},[cartedProducts]);

  function resetCounts() {
    // setProducts(products.map((prd) => ({ ...prd, carted: 0 })));

    setCartedProducts([]);
    axios.patch(`http://localhost:3000/carts/${userId}`, {products:[]});
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
    // setProducts( products.map((prd)=>prd.id === id && prd.carted > 0 ? { ...prd, carted: prd.carted - 1 } : prd ));

    const tempCartedProducts = [...cartedProducts];
    const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
    const count = tempCartedProducts[crtdPrdNdx].carted;

    if(count > 1){
      tempCartedProducts[crtdPrdNdx].carted = cartedProducts[crtdPrdNdx].carted - 1;
      
      setCartedProducts(tempCartedProducts);

      axios.patch(`http://localhost:3000/carts/${userId}`, {products:tempCartedProducts});
    }else if(count == 1){

      tempCartedProducts.splice(crtdPrdNdx, 1);
      setCartedProducts(tempCartedProducts);

      axios.patch(`http://localhost:3000/carts/${userId}`, {products:tempCartedProducts});
    }
    
  }

  function delOrder(id) {
    // setProducts(products.filter((prd) => prd.id !== id));

    const tempCartedProducts = [...cartedProducts];
  
    const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
    tempCartedProducts.splice(crtdPrdNdx, 1);

    setCartedProducts(tempCartedProducts);

    axios.patch(`http://localhost:3000/carts/${userId}`, {products:tempCartedProducts});
  }

  // function cartProduct(id) {
  //   console.log("carting: ", id);
  //   const tempCartedProducts = [...cartedProducts];
  //   const userCart = userData.cart;
  //   const count = userCart[id];
  //   let tempUserCart;
  //   if (count) {
  //     // cartedProduct[id].count++
  //     tempUserCart = {...userCart, [id]:count+1}
  //     const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
  //     tempCartedProducts[crtdPrdNdx].carted = cartedProducts[crtdPrdNdx].carted + 1;
  //   } else {
  //     // cartedProduct.add(product(id))
  //     tempUserCart = { ...userCart, [id]: 1 };
  //     const prdNdx = products.findIndex((prd) => prd.id == id);
  //     tempCartedProducts.push({ ...products[prdNdx], carted: 1 });
  //   }
    
  //   // const tempUserData = { ...userData, cart: tempUserCart };
  //   setUserData({ ...userData, cart: tempUserCart });
  //   setCartedProducts(tempCartedProducts);

  //   // axios.put(`http://localhost:3000/users/${userId}`, tempUserData);
  //   axios.patch(`http://localhost:3000/users/${userId}`, {cart:tempUserCart});
  //   // const tempProducts = products.map((itm) =>
  //   //   itm.id == id ? { ...itm, carted: itm.carted + 1 } : itm
  //   // );
  //   // setProducts(tempProducts);
  // }
  function cartProduct(id) {
    console.log("carting: ", id);
    const tempCartedProducts = [...cartedProducts];
    const crtdPrdNdx = cartedProducts.findIndex((prd) => prd.id == id);
    
    if (crtdPrdNdx !== -1) {
      // if carted: increment count
      tempCartedProducts[crtdPrdNdx].carted += 1;
    } else {
      // if not carted: add it
      const prdNdx = products.findIndex((prd) => prd.id == id);
      tempCartedProducts.push({ ...products[prdNdx], carted: 1 });
    }
    
    setCartedProducts(tempCartedProducts);

    axios.patch(`http://localhost:3000/carts/${userId}`, {products:tempCartedProducts});

  }


  function turnPage(number) {
    
    async function getPage(){
      const { data: prodData, headers } = await axios.get(
        `http://localhost:3000/products?${
          selectedCategorySlug ? `category=${selectedCategorySlug}` : ""
        }&_page=${number}&_limit=${pageLimit}`
      );
      const productsCount = headers.get("x-total-count");
      // const productsCount = filteredProducts.length;
      setNpages(Math.ceil(productsCount / pageLimit));
      // console.log("⬇️productsCount: ", productsCount);
      // console.log("⬇️fetched prodData: ", prodData);
      
      setProducts(prodData);
      setCurrentPage(number);
    }
    getPage();
  }

  function filterByCategory(slug){
    console.log("🟡 filter by ", slug);
    async function getfiltered(){

      const { data: prodData, headers } = await axios.get(`http://localhost:3000/products?category=${slug}&_page=1&_limit=${pageLimit}`);
      const productsCount = headers.get("x-total-count");
      console.log("⬇️productsCount: ", productsCount);
      console.log("⬇️fetched filtered products: ", prodData);
      setNpages(Math.ceil(productsCount / pageLimit));
      setCurrentPage(1);
      setSelectedCategorySlug(slug);
      setProducts(prodData)
    }
    getfiltered(); 
  }

  function searchProducts(e){
    console.log(refInput.current.value);
    setSearchWord(refInput.current.value);
  }

  function hndlDeleteProduct(id){
    console.log("🟢 del");
    const tempProducts = [...products];
    
    const prdNdx = products.findIndex((prd) => prd.id == id);
    tempProducts.splice(prdNdx, 1);

    setProducts(tempProducts);

    axios.delete(`http://localhost:3000/products/${id}`);
    
  }
  
  function hndlAddProduct(product){
    console.log("🟢addprod: ", product);
    
    //* client-side edit
    // const tempProducts = [...products];
    // tempProducts.push(product);  
    // setProducts(tempProducts);
    
    //* server-side edit req
    axios.post(`http://localhost:3000/products`, product)
    .then( (response) => { console.log("add product response: ", response); navigate("/admin"); })
    .catch((error) => { console.log("add product res error: ", error); });
  }
  
  function hndlEditProduct(id){
    const theProductI = products.findIndex(prd=>prd.id==id);
    console.log("🟢 edit: ", theProductI, products[theProductI]);
    navigate("/editproduct", {state: products[theProductI]})

  }

  function hndlUpdateProduct(product){
    console.log("🟢🟢📩");
    
    const prodI = products.findIndex((prd)=>prd.id==product.id);
    const tempProduct = {...products[prodI], title:product.title, category:product.category, price:product.price, thumbnail:product.thumbnail};
    const tempProducts = [...products];
    tempProducts[prodI] = tempProduct;
    setProducts(tempProducts);

    axios.patch(`http://localhost:3000/products/${product.id}`, {title:product.title, category:product.category, price:product.price, thumbnail:product.thumbnail})
    .then((response)=> {
      console.log("add product response: ", response);
      navigate("/admin");
    })
    .catch((error)=>console.log("add product res error: ", error));
  }

  return (
    <>
      <globalContext.Provider
        value={{
          categories,
          filterByCategory,
          selectedCategory,
          searchProducts,
          refInput,
          searchedProducts,
        }}
      >
        <Navbar pad={padding} cartCount={cartedProducts?.length || 0} />

        <Routes>
          <Route
            path="/"
            element={
              <div>

              <div className="flex w-full  h-9/12 items-center justify-center text-9xl mb-20">
                Welcome
              </div>
              <div className="flex justify-center gap-7 text-4xl">
                <a href="/admin" className="link-hover">Admin</a>
                <a href="/home" className="link-hover link-accent">User</a>
              </div>
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
                products={searchedProducts}
                cart={cartedProducts}
                Npages={Npages}
                currentPage={currentPage}
                cartProduct={cartProduct}
                loading={loading}
                turnPage={turnPage}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <Admin 
                products={products}
                Npages={Npages}
                currentPage={currentPage}
                loading={loading}
                turnPage={turnPage}
                hndlEditProduct={hndlEditProduct}
                hndlDeleteProduct={hndlDeleteProduct}
              />
            }
          />

          <Route 
            path="/addproduct"
            element={<AddProduct addOrEdit={"Add"} hndlAddProduct={hndlAddProduct} categories={categories} />}
          />
          
          <Route 
            path="/editproduct"
            element={<EditProduct  hndlUpdateProduct={hndlUpdateProduct} categories={categories} />}
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </globalContext.Provider>
    </>
  );
}

export default App;
