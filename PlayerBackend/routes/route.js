const express = require('express');
const router = express.Router();
const Player = require('../models/player')



router.get('/getplayers', async (req, res) => {
    const players = await Player.find({});
    try {
       res.send(players);
     } catch (error) {
       res.status(500).send(error);
     }
 })
 
 
 
 
 
 //POST: create a new player record 
 router.post('/addplayer', async (req, res) => {
    var newPlayer = new Player({
           name : req.body.name,
           touchdowns : req.body.touchdowns,
           passYards : req.body.passYards,
           rushYards : req.body.rushYards,
           recYards : req.body.recYards,
           fgMade: req.body.fgMade
        })

    newPlayer.save((err, player) => {
        if(err){
            res.json({msg: 'Failed to add player'});
        }
        else{
            res.json({msg: 'Player added successfully'});
        }
    })
 })
 
 
 
 
 
 
 //DELETE: delete a particular player by id
 router.delete('/deleteplayer/:id', async (req, res) => {
    await Player.deleteOne({"_id": req.params.id})
       .then(result => {
          if(result.deletedCount === 0){
            res.json({msg: 'No record was deleted'});
          }
          else{
            res.json({msg: 'Player successfully deleted'});
          }
       })
       .catch(error => res.json(error))
 })
 
 
 
 
 
 
 
 //UPDATE: update an existing player
 router.put('/updateplayer/:id', async (req, res) => {
    await Player.updateMany({"_id": req.params.id},
    {
        $set: req.body
    })
    .then(result => {
        res.json({msg: 'Player Updated Successfully'});
    }) 
    .catch(error => res.json(error))
})
 
 
 
 
 
 
 
 
 
 //GET player with most field goals made
 router.get('/getplayermostfgm', async (req, res) => {
    await Player.find().sort({"fgMade":-1}).limit(1)
       .then(result => {
          res.json(result);
       })
       .catch(error => console.error(error))
 })
 
 
 
 
 
 
 
 //GET player with most receiving yards
 router.get('/getplayermostrecyards', async (req, res) => {
    await Player.find().sort({"recYards":-1}).limit(1)
       .then(result => {
          res.json(result);
       })
       .catch(error => console.error(error))
 })
 
 
 
 
 
 
 //GET player with most touchdowns
 router.get('/getplayermosttouchdowns', async (req, res) => {
    await Player.find().sort({"touchdowns":-1}).limit(1)
       .then(result => {
          res.json(result);
       })
       .catch(error => console.error(error))
 })
 
 
 
 
 
 
 
 //GET all players by most pass yards descending
 router.get('/getplayerspassyardsdescending', async (req, res) => {
    await Player.find().sort({"passYards":-1})
       .then(results => {
          res.json(results);
       })
       .catch(error => console.error(error))
 })
 
 
 
 
 
 
 
 //GET all players by rush yards descending
 router.get('/getplayersrushyardsdescending', async (req, res) => {
    await Player.find().sort({"rushYards":-1})
       .then(results => {
          res.json(results);
       })
       .catch(error => console.error(error))
 })
 

module.exports = router;