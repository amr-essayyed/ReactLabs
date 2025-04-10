import React, { useRef } from 'react';
import { useLocation } from 'react-router';


export default function EditProduct({addOrEdit, hndlUpdateProduct, categories}) {
    const refName = useRef()
    const refPrice = useRef()
    const refImg = useRef()
    const refCategory = useRef()
    const location = useLocation();
    const oldProduct = location.state;
    console.log(oldProduct);
    

    return (
    <form className="p-7">
      <h1> {addOrEdit} Product </h1>
      {/* title */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Product Title</legend>
        <input type="text" className="input" placeholder="Type here" ref={refName} required defaultValue={oldProduct.title}/>
        <p className="fieldset-label">Required</p>
      </fieldset>

      {/* category */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend" >Product Category</legend>
        <select className="select" ref={refCategory} required defaultValue={oldProduct.category}>
            <option disabled={true}>Pick a category</option>{
              categories.map( category=>
                  <option key={category.slug}>{category.slug}</option>
              )}
        </select>
        <span className="fieldset-label">Optional</span>
      </fieldset>

      {/* price */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Product Price</legend>
        <input type="number" className="input" placeholder="Type here" ref={refPrice} required defaultValue={oldProduct.price}/>
        <p className="fieldset-label">Required</p>
      </fieldset>

      {/* thumpnail */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend" required>Product Image</legend>
        <input type="file" className="file-input" placeholder="Type here" />
        <p className="fieldset-label">Optional</p>
      </fieldset>
      <button type="submit" className="btn btn-success" 
      onClick={
        (e)=>
            {
                e.preventDefault();
                hndlUpdateProduct({id:oldProduct.id, title:refName.current.value, category:refCategory.current.value, price:refPrice.current.value})
            }
      }
      >{addOrEdit || "Add"}</button>
    </form>
  );
}
