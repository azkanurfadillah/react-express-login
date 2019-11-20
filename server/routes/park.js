const express = require('express')
const router = express.Router()
const Park = require('../models/park')
const helper = require('./helper')


//GET ALL PARK LIST
router.get('/', async (req,res) => {
    try {
        const parks = await Park.find()
        res.json(parks)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get one park
router.get('/:id', helper.get_park, (req,res) => {
    res.json(res.park) // res.park didapat dari parkHelper
})

// create a new park
router.post('/', async (req,res) => {
    const park = new Park(req.body)

    try{
        const newPark = await park.save()
        res.status(201).json(newPark)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router