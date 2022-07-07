import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
const axios = require('axios').default;

function Main(){

    const userMail = localStorage.getItem("userMail").substring(1,localStorage.getItem("userMail").length-1);
    const userBalance = localStorage.getItem("userBalance");
    const [lands , setMap] = useState([]);
    const [isDataLoad , setDataLoad] = useState(false);
    const matrix = [];
    
    function init(){
      var size = 50;
        for (var i =0; i<size ; i++){
        matrix[i] = [];
        for (var j=0; j<size; j++){
          matrix[i][j] = {
            ownerId: "oriya",
            type: "",
            rowIndex: i,
            colIndex: j,
            cost: 0,
            game: "",
            isForSale: true
          };
        }
      }
      getLandsFromDB();
    }
    

    useEffect( () => {
      init();
    } , [isDataLoad])
    function getLandsFromDB(){
          const URL = 'http://localhost:4000/lands/lands';
      axios.get(URL)
      .then((res) => {
        if (res.data){
          // console.log(res.data);
          // console.log(res.data.length);
          //setMap(res.data);
          var size = res.data.length;
          for (var i=0; i<size ; i++){
            for (var j=0; j<size; j++){
              matrix[i][j].ownerId = res.data[i][j].ownerId; 
              matrix[i][j].type = res.data[i][j].type; 
              matrix[i][j].rowIndex = res.data[i][j].rowIndex; 
              matrix[i][j].colIndex = res.data[i][j].colIndex; 
              matrix[i][j].cost = res.data[i][j].cost; 
              matrix[i][j].game = res.data[i][j].game; 
              matrix[i][j].isForSale = res.data[i][j].isForSale; 
              
            }
          }
          setMap(matrix);

        }else{

        }
      });
    }
   
    

   function checkLand(land){
    if (land.type === "park"){
      return "park-land";
    }else if (land.type === "road"){
      return "road-land";
    }else if (land.type === "NFT"){
      if (!land.isForSale){
        return "nftnotsale-land";
      }else if (land.isForSale){
        return "nftsale-land";
      }else if (land.ownerId === userMail){
        return "mynft-land";
      }
    }
   }


    return <div>
        <NavBar userBalance={userBalance} userMail={userMail}/>
        
        <div className="rowOfLands">
           {
            lands.map( (row , coIndex) => {
              return <div className="colOfLands" key={`col${coIndex}`}>
                  {row.map( (element , rowIndex) => {
                      const l = checkLand(element); 
                      console.log(element);
                      return <div className={`matrixOfLands land ${l}`} key={`${rowIndex}_${coIndex}`}> 
                          
                      </div>
                  })}  
              
              </div>
            })
           }
        </div>
  
        <Footer/>
    </div>
}

export default Main;