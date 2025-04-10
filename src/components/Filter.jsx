import React, { useContext } from 'react'

import { globalContext } from '../App'

export default function Filter() {
  console.log("🟡 rendering filter");
  const { categories, filterByCategory, selectedCategory } = useContext(globalContext);
  console.log("🟡 selectedCategory", selectedCategory);
  
  return (
    <ul className="col-span-1 menu bg-base-200 rounded-box w-56">
      {categories.map((category) => (
        <li
          key={category.slug}
          onClick={() => filterByCategory(category.slug)}
          className={
            category.slug === selectedCategory?.slug ? "bg-success" : ""
          }
        >
          <a>{category.name}</a>
        </li>
      ))}
    </ul>
  );
}
