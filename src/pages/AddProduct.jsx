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
        <label className="input validator">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></svg>
          <input type="url" placeholder="https://" defaultValue="https://" pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$" title="Must be valid URL" ref={refImg} />
        </label>
        <p className="validator-hint">Must be valid URL</p>

        {/* <legend className="fieldset-legend" required>Product Image</legend>
        <input type="url" className="input" placeholder="Type here" ref={refImg} />
        <p className="fieldset-label">Optional</p> */}
      </fieldset>
      <button type="submit" className="btn btn-success" 
      onClick={
        (e)=>
            {
                e.preventDefault();
                hndlAddProduct({title:refName.current.value, category:refCategory.current.value, price:refPrice.current.value, thumbnail:refImg.current.value})
            }
      }
      >{addOrEdit || "Add"}</button>
    </form>
  );
}
