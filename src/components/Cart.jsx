import '../style.css'
import CartItem from './CartItem';


export default function Cart(props){

  console.log(props.pad);
  
  return (
    <div className={`px-${props.pad}`}>
      <table className="table-auto w-full text-4xl ">
        <thead className="text-left">
          <tr>
            <th>id</th>
            <th>order</th>
            <th>count</th>
            {/* <th>inc</th>
            <th>dec</th>
            <th>del</th> */}
          </tr>
        </thead>
        <tbody>
          {
            props.orders.map( (ord)=> <CartItem key={ord.id} id={ord.id} name={ord.name} count={ord.count} incCount={props.incCount} decCount={props.decCount} delOrder={props.delOrder} /> )
          }
        </tbody>
      </table>
      {/* <button onClick={resetCounts} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">reset</button> */}
      <button onClick={props.resetCounts} className="btn">reset</button>
    </div>
  )
}