import React, { useRef } from 'react'

export default function AddProduct({addOrEdit, hndlAddProduct, categories}) {
    const refName = useRef()
    const refPrice = useRef()
    const refImg = useRef()
    const refCategory = useRef()
    // const product = 

    return (
    <form className="p-7">
      <h1> {addOrEdit} Product </h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Product Title</legend>
        <input type="text" className="input" placeholder="Type here" ref={refName} required/>
        <p className="fieldset-label">Required</p>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend" >Product Category</legend>
        <select defaultValue="Pick a browser" className="select" ref={refCategory} required>
            <option disabled={true}>Pick a category</option>{
              categories.map( category=>
                  <option key={category.slug}>{category.slug}</option>
              )}
        </select>
        <span className="fieldset-label">Optional</span>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Product Price</legend>
        <input type="number" className="input" placeholder="Type here" ref={refPrice} required />
        <p className="fieldset-label">Required</p>
      </fieldset>

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
                hndlAddProduct({title:refName.current.value, category:refCategory.current.value, price:refPrice.current.value})
            }
      }
      >{addOrEdit || "Add"}</button>
    </form>
  );
}
