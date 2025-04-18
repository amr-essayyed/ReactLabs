import React from 'react'

export default function MenuItem(props) {
  // console.log("🔴",props.id, " carted", props.carted)
  
  const displayIndicator = props.carted>0? "":"hidden"
  const classIndictor  = `indicator ${displayIndicator}`
  return (
    <tr className="">
      <td>
        <img src={props.pic} alt="thN" className="h-15" />
      </td>
      <td>{props.name}</td>
      <td>${props.price}</td>
      <td
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.cartProduct(props.id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={props.carted > 0 ? "black" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <div className={classIndictor}>
          <span className="badge badge-sm indicator-item">{props.carted}</span>
        </div>
      </td>
    </tr>
  );
}
