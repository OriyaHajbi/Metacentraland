const express = require("express");
const Land = require("../models/Land");
const router = express.Router();


//GETTING ALL lands
router.get("/lands" , async (req, res) => {
    try {
        const lands = await Land.find();
        const size = Math.sqrt(lands.length);
        const landsRow = [];
        for (var i=0; i< size ; i++){
            const landsCol = [];
            for (var j=0; j<size; j++){
                landsCol.push(lands[i*size+j]);
            }
            landsRow.push(landsCol);
        }
        return res.send(landsRow);
    }catch(err){
        return res.json(err);
    }
});

//get Land by row & col
router.get("/land" , async (req, res) => {
   const row = req.query.row;
   const col = req.query.col;
   //console.log(row + " " +col);

    Land.findOne({rowIndex: row , colIndex: col} , function(err , foundLand){
        if (foundLand){
            res.send(foundLand);
        }else{
            res.send(err);
        }
    })
});

//update Land by ID
router.patch("/updateland" , async (req, res) => {
   const id = req.body.id;
   const newCost = parseInt(req.body.cost);
   const newGame = req.body.game;
   const newIsForSale = req.body.isForSale;
   const newData = {
    cost: newCost,
    game: newGame,
    isForSale: newIsForSale
   }

    Land.findByIdAndUpdate(id, newData , function(err , foundLand){
        if (foundLand){
            res.send(foundLand)
        }else{
            res.send(err);
        }
    })
});



module.exports = router;