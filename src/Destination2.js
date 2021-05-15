import { useState } from "react";

const Destination2 = (props) => {
    const [clicked, setClicked] = useState(0);
    const [selected, setSelected] = useState(0);
    const planetSelectingHandler = (evt) => {
        props.SetDistanceOfDestinationTwo((prev) => prev= evt.target.value);  setClicked(true); 
        props.SetFalconeFound( props.FalconeFound ? true : ((evt.target.value/100)-1) === props.Falcone)
    }
    return (
        <div>
        {props.Planets  ?
      <div>
      <select value={props.DistanceOfDestinationTwo}  onChange = {planetSelectingHandler}>
  <option >select</option>
  {props.Planets.filter((planet) =>(planet.distance !== Number(props.DistanceOfDestinationOne)) && (planet.distance !== Number(props.DistanceOfDestinationThree)) 
        && (planet.distance !== Number(props.DistanceOfDestinationFour))).map((Item,Idx) => { 
      return(
      <option value={Item.distance} text={Item.name} key={Idx} disabled = {Number(props.DistanceOfDestinationTwo) === Item.distance} >{Item.name}</option>)
      })}
  </select>
  {clicked ? <form >
        {props.Vehicles.map((item, idx) => {
            return(
            <div key={idx} style={{textAlign:"left"}}><input type="radio" value={item.max_distance} name={item.name} 
                checked ={Number(selected) === item.max_distance} onChange={(evt) =>{setSelected(evt.target.value); 
                    props.SetTimeTaken((prev) => prev + (props.DistanceOfDestinationTwo / item.speed));  
                    props.NumberOfItems[idx] = props.NumberOfItems[idx] > 0 ? props.NumberOfItems[idx] -1 : props.NumberOfItems[idx]; 
                    props.SetNoOfItems([...props.NumberOfItems]) }} 
                disabled ={Number(props.DistanceofDestinationTwo) > item.max_distance || props.NumberOfItems[idx] === 0} />  
                 {item.name}({props.NumberOfItems[idx]})  
                 <br />
                 </div>)})}
            </form> : "" } 
  </div>
    : ""}
    </div>
    )   
}

export default Destination2;