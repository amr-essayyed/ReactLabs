import '../style.css'

export default function CartItem(props){
    console.log("rendering cart item");
    
    return (
        <tr className="">
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.count}</td>
            <td><button onClick={()=>props.incCount(props.id)} className="btn btn-success">+</button></td>
            <td><button onClick={()=>props.decCount(props.id)} className="btn btn-warning">-</button></td>
            <td><button onClick={()=>props.delOrder(props.id)} className="btn btn-error">x</button></td>
        </tr>

    )
}