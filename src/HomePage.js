import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Destination1 from './Destination1';
import Destination2 from './Destination2';
import Destination3 from './Destination3';
import Destination4 from './Destination4';

const HomePage = (props) => {
  let Falcone = props.falcone;
    const [timeTaken, setTimeTaken] = useState(0);
  const [toggleFalconeButton, settoggleFalconeButton] = useState('');
  const [planets, setPlanets] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  
  const [distanceOfDestinationOne, setDistanceOfDestinationOne] = useState(0);
  const [distanceOfDestinationTwo, setDistanceOfDestinationTwo] = useState(0);
  const [distanceOfDestinationThree, setDistanceOfDestinationThree] = useState(0);
  const [distanceOfDestinationFour, setDistanceOfDestinationFour] = useState(0);

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
    props.SetFalcone(Math.floor(Math.random() * 6));

    setTimeTaken(0);
    settoggleFalconeButton(false);

    setFalconeclicked(false); 
    setFalconeFound(false);
    setNoOfItems([2,1,1,2]);

    setDistanceOfDestinationOne(0);
    setDistanceOfDestinationTwo(0);
    setDistanceOfDestinationThree(0);
    setDistanceOfDestinationFour(0);

  }

  useEffect(() => {
    fetchPlanets();
    fetchVehicles();
  },[tokensInfo, valueOfToken]);

  return (
    <div className="App">
      <h1> Finding Falcone! </h1>
      {falconeClicked ? falconeFound ? 
      <><h3> Success! Congratulations on Finding Falcone. King Shan in mighty pleased </h3> 
      <h3> Time taken : {timeTaken} <br />
            Planet found :  {planets[props.falcone].name}
       </h3>
       <button className="buttons" onClick={startButton} >Start Again </button>
      </> : 
      <><h3> Failure! Please try again. King Shan is not pleased </h3>
      <button className="buttons" onClick={startButton}>Start Again </button>
      </> :
      <> 
      <h3> Select planets you want to search in: </h3>
      <div className="styling">
       <div>
         Destination 1
         <Destination1 Planets={planets} Vehicles={vehicles} Falcone={Falcone} DistanceOfDestinationOne={distanceOfDestinationOne} DistanceOfDestinationTwo={distanceOfDestinationTwo} 
            DistanceOfDestinationThree={distanceOfDestinationThree} DistanceOfDestinationFour={distanceOfDestinationFour} SetDistanceOfDestinationOne = {(e) => setDistanceOfDestinationOne(e)}
             FalconeFound={falconeFound} SetFalconeFound={(e) => setFalconeFound(e)} TimeTaken={timeTaken} SetTimeTaken={(e) => setTimeTaken(e)} NumberOfItems={numberOfItems} SetNoOfItems={(e) => setNoOfItems(e)} 
             />
         </div>
         <div>
         Destination 2
         <Destination2 Planets={planets} Vehicles={vehicles} Falcone={Falcone} DistanceOfDestinationOne={distanceOfDestinationOne} DistanceOfDestinationTwo={distanceOfDestinationTwo} 
            DistanceOfDestinationThree={distanceOfDestinationThree} DistanceOfDestinationFour={distanceOfDestinationFour} SetDistanceOfDestinationTwo = {(e) => setDistanceOfDestinationTwo(e)} 
            FalconeFound={falconeFound} SetFalconeFound={(e) => setFalconeFound(e)} TimeTaken={timeTaken} SetTimeTaken={(e) => setTimeTaken(e)} NumberOfItems={numberOfItems} SetNoOfItems={(e) => setNoOfItems(e) } SettoggleFalconeButton={(e) => settoggleFalconeButton(e)} 
            />        
         </div>
         <div>
         Destination 3
         <Destination3 Planets={planets} Vehicles={vehicles} Falcone={Falcone} DistanceOfDestinationOne={distanceOfDestinationOne} DistanceOfDestinationTwo={distanceOfDestinationTwo} 
            DistanceOfDestinationThree={distanceOfDestinationThree} DistanceOfDestinationFour={distanceOfDestinationFour} SetDistanceOfDestinationThree = {(e) => setDistanceOfDestinationThree(e)} 
            FalconeFound={falconeFound} SetFalconeFound={(e) => setFalconeFound(e)} TimeTaken={timeTaken} SetTimeTaken={(e) => setTimeTaken(e)} NumberOfItems={numberOfItems} SetNoOfItems={(e) => setNoOfItems(e)} 
            />      
         </div>
         <div>
         Destination 4
         <Destination4 Planets={planets} Vehicles={vehicles} Falcone={Falcone} DistanceOfDestinationOne={distanceOfDestinationOne} DistanceOfDestinationTwo={distanceOfDestinationTwo}  
            DistanceOfDestinationThree={distanceOfDestinationThree} DistanceOfDestinationFour={distanceOfDestinationFour} SetDistanceOfDestinationFour = {(e) => setDistanceOfDestinationFour(e)} 
            FalconeFound={falconeFound} SetFalconeFound={(e) => setFalconeFound(e)} TimeTaken={timeTaken} SetTimeTaken={(e) => setTimeTaken(e)} NumberOfItems={numberOfItems} SetNoOfItems={(e) => setNoOfItems(e)} SettoggleFalconeButton={(e) => settoggleFalconeButton(e)} 
            />
         </div>
         <div> Time Taken : {timeTaken}
           </div>
      </div>

      <button className="buttons" style={{margin:"40px"}} disabled = {toggleFalconeButton  ? false : true} onClick={() => {setFalconeclicked(true)}}> Find Falcone!</button>
      </>
      }
      
    </div>
  );
}

export default HomePage;