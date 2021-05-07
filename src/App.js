import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./App.css";

let falcone = Math.floor(Math.random() * 6);

function App() {
 
  console.log("falcone is at :" ,falcone);
  
  const [timeTaken, setTimeTaken] = useState(0);
  const [toggleFalconeButton, settoggleFalconeButton] = useState(false);
  const [planets, setPlanets] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  
  const [firstPlanetDistance, setFirstPlanetDistance] = useState(0);
  const [secondPlanetDistance, setSecondPlanetDistance] = useState(0);
  const [thirdPlanetDistance, setThirdPlanetDistance] = useState(0);
  const [fourthPlanetDistance, setFourthPlanetDistance] = useState(0);

  const [firstSelected, setfirstSelected] = useState(0);
  const [secondSelected, setSecondSelected] = useState(0);
  const [thirdSelected, setThirdSelected] = useState(0);
  const [fourthSelected, setFourthSelected] = useState(0);

  const [clickedFirst, setClickedFirst] = useState(false);
  const [clickedSecond, setClickedSecond] = useState(false);
  const [clickedthird, setClickedThird] = useState(false);
  const [clickedFourth, setClickedFourth] = useState(false);

  const [falconeClicked, setFalconeclicked] = useState(false);
  const [falconeFound,setFalconeFound] = useState(false);
  const [numberOfItems , setNoOfItems] = useState([2,1,1,2]);

  let [tokensInfo, setTokensInfo] = useState(null);

  const fetchPlanets = async () => {
    const res = await axios.get("https://findfalcone.herokuapp.com/planets");
    
    setPlanets(res.data);
  };

  const fetchVehicles = async () => {
    const res = await axios.get("https://findfalcone.herokuapp.com/vehicles")
      setVehicles(res.data); 
  }

  const token = async () => {
    const res = await axios.get("https://findfalcone.herokuapp.com/token", {
      "Accept" : "application/json"
    });
    setTokensInfo(res.data);
  }

  const valueOfToken = useCallback( async() =>{ axios.post("https://findfalcone.herokuapp.com/find", token, {
    "Accept" : "application/json",
    "Content-Type" :"application/json"
  })
  .then((res) => {console.log(res)})
  },[])

  const startButton = () => {
    falcone = Math.floor(Math.random() * 6);

    setTimeTaken(0);
    settoggleFalconeButton(false);

    setFalconeclicked(false); 
    setFalconeFound(false);
    setNoOfItems([2,1,1,2]);

    setFirstPlanetDistance(0);
    setSecondPlanetDistance(0);
    setThirdPlanetDistance(0);
    setFourthPlanetDistance(0);

    setfirstSelected(0);
    setSecondSelected(0);
    setThirdSelected(0);
    setFourthSelected(0);
    
    setClickedFirst(false);
    setClickedSecond(false);
    setClickedThird(false);
    setClickedFourth(false);
  }

  useEffect(() => {
    console.log("token",token)
    console.log("tokensInfo", tokensInfo);

    fetchPlanets();
    fetchVehicles();
  },[tokensInfo, valueOfToken]);

  return (
    <div className="App">
      <h1> Finding Falcone! </h1>
      {falconeClicked ? falconeFound ? 
      <><h3> Success! Congratulations on Finding Falcone. King Shan in mighty pleased </h3> 
      <h3> Time taken : {timeTaken} <br />
            Planet found :  {planets[falcone].name}
       </h3>
       <button onClick={startButton}>Start Again </button>
      </> : 
      <><h3> Failure! Please try again. King Shan is not pleased </h3>
      <button onClick={startButton}>Start Again </button>
      </> :
      <> 
      <h3> Select planets you want to search in: </h3>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
       <div>
         Destination 1
         {planets  ?
      <div>
      <select value={firstPlanetDistance}  onChange = {(evt) => {setFirstPlanetDistance(evt.target.value) ; setClickedFirst(true); setFalconeFound( falconeFound ? true : ((evt.target.value/100)-1) === falcone) }}>
  <option >select</option>
  {planets.filter((planet) =>(planet.distance !== Number(secondPlanetDistance)) && (planet.distance !== Number(thirdPlanetDistance)) && (planet.distance !== Number(fourthPlanetDistance))).map((Item,Idx) => {return(<option value={Item.distance} text={Item.name} key={Idx} disabled = {Number(firstPlanetDistance) === Item.distance} >{Item.name}</option>)})}
  </select>
  {clickedFirst ? <form >
        {vehicles.map((item, idx) => {return(<div key={idx} style={{textAlign:"left"}}><input type="radio" value={item.max_distance} name={item.name} checked ={Number(firstSelected) === item.max_distance} onChange={(evt) =>{setfirstSelected(evt.target.value); setTimeTaken((prev) => prev + (firstPlanetDistance / item.speed));  numberOfItems[idx] = numberOfItems[idx] > 0 ? numberOfItems[idx] -1 : numberOfItems[idx]; setNoOfItems([...numberOfItems]); }}  disabled ={Number(firstPlanetDistance) > item.max_distance || numberOfItems[idx] === 0} />  {item.name}({numberOfItems[idx]})  <br /></div>)})}
            </form> : "" } 
  </div>
    : ""}
         </div>
         <div>
         Destination 2
         {planets  ?
      <div>
      <select value={secondPlanetDistance} onChange = {(evt) => {setSecondPlanetDistance(evt.target.value);setClickedSecond(true) ; setFalconeFound(falconeFound ? true : ((evt.target.value/100)-1) === falcone)}}>
  <option>select</option>
  {planets.filter((planet) => (planet.distance !== Number(firstPlanetDistance)) && (planet.distance !== Number(thirdPlanetDistance)) && (planet.distance !== Number(fourthPlanetDistance))).map((Item,Idx) => {return(<option value={Item.distance} key={Idx} disabled = {Number(secondPlanetDistance) === Item.distance} >{Item.name}</option>)})}
  </select>
  {clickedSecond ? <form >
        {vehicles.map((item, idx) => {return(<div key={idx} style={{textAlign:"left"}}> <input type="radio" value={item.max_distance} name={item.name} checked ={Number(secondSelected) === item.max_distance} onChange={(evt) => {setSecondSelected(evt.target.value) ; setTimeTaken((prev) => prev + (secondPlanetDistance / item.speed)); numberOfItems[idx] = numberOfItems[idx] > 0 ? numberOfItems[idx] -1 : numberOfItems[idx]; setNoOfItems([...numberOfItems]); }} disabled ={Number(secondPlanetDistance) > item.max_distance || numberOfItems[idx] === 0}/>  {item.name}({numberOfItems[idx]})  <br /></div>)})}
            </form> : "" } 
  </div>
    : ""}
         </div>
         <div>
         Destination 3
         {planets  ?
      <div>
      <select value={thirdPlanetDistance} onChange = {(evt) => {setThirdPlanetDistance(evt.target.value); setClickedThird(true); setFalconeFound( falconeFound ? true : ((evt.target.value/100)-1) === falcone)}}>
  <option>select</option>
  {planets.filter((planet) =>  (planet.distance !== Number(firstPlanetDistance)) && (planet.distance !== Number(secondPlanetDistance)) && (planet.distance !== Number(fourthPlanetDistance))).map((Item,Idx) => {return(<option value={Item.distance} key={Idx} disabled = {Number(thirdPlanetDistance) === Item.distance} >{Item.name}</option>)})}
  </select>
  {clickedthird ? <form >
        {vehicles.map((item, idx) => {return(<div key={idx} style={{textAlign:"left"}}> <input type="radio" value={item.max_distance} name={item.name} checked ={Number(thirdSelected) === item.max_distance} onChange={(evt) => {setThirdSelected(evt.target.value); setTimeTaken((prev) => prev + (thirdPlanetDistance / item.speed)); numberOfItems[idx] = numberOfItems[idx] > 0 ? numberOfItems[idx] -1 : numberOfItems[idx]; setNoOfItems([...numberOfItems])}} disabled ={(Number(thirdPlanetDistance) > item.max_distance) || numberOfItems[idx] === 0}/>  {item.name}({numberOfItems[idx]}) <br /></div>)})}
            </form> : "" } 
  </div>
    : ""}
         </div>
         <div>
         Destination 4
         {planets  ?
      <div>
      <select value={fourthPlanetDistance}  onChange = {(evt) => {setFourthPlanetDistance(evt.target.value); setClickedFourth(true); setFalconeFound( falconeFound ? true : ((evt.target.value/100)-1) === falcone)}}>
  <option>select</option>
  {planets.filter((planet) => (planet.distance !== Number(firstPlanetDistance)) && (planet.distance !== Number(secondPlanetDistance)) && (planet.distance !== Number(thirdPlanetDistance))).map((Item,Idx) => {return(<option value={Item.distance} key={Idx} disabled = {Number(fourthPlanetDistance) === Item.distance} >{Item.name}</option>)})}
  </select>
  {clickedFourth ? <form >
        {vehicles.map((item, idx) => {return(<div key={idx} style={{textAlign:"left"}}> <input type="radio" value={item.max_distance} name={item.name} checked ={Number(fourthSelected) === item.max_distance} onChange={(evt) => {setFourthSelected(evt.target.value); setTimeTaken((prev) => prev + (fourthPlanetDistance / item.speed)); numberOfItems[idx] = numberOfItems[idx] > 0 ? numberOfItems[idx] -1 : numberOfItems[idx]; setNoOfItems([...numberOfItems])}} onClick={() => {settoggleFalconeButton(true)}} disabled ={Number(fourthPlanetDistance) > item.max_distance || numberOfItems[idx] === 0}/>  {item.name}({numberOfItems[idx]}) <br /></div>)})}
            </form> : "" } 
  </div>
    : ""}
         </div>
         <div> Time Taken : {timeTaken}
           </div>
      </div>

      <button style={{margin:"40px"}} disabled = {toggleFalconeButton  ? false : true} onClick={() => {setFalconeclicked(true)}}> Find Falcone!</button>
      </>
      }
      
    </div>
  );
}

export default App;
