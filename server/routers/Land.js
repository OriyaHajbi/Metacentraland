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
})


module.exports = router;