const express = require('express')
const router = express.Router()
const User = require('../models/user')
const helper = require('./helper')
const auth = require('./auth')


//GET ALL users
router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// get one users
router.get('/:id', helper.get_user, (req,res) => {
    res.json(res.user)
})

// create a new users
router.post('/', async (req,res) => {
    if(req.body.password === req.body.password2){
        res.send({message: 'your password is correct'})
    }
    const user = new User(req.body)
    try{
        await user.save()
        // const token = await user.generateAuthToken()
        // res.status(201).send({user,token})
        await user.generateAuthToken()
        console.log(user.password)
        res.status(201).send({user}) //, token
    }catch (err){
        res.status(400).json({message: err.message})
    }
})


// user/login
router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if(!user){
            return res.status(401).send({message: 'Login failed! Check authentication'})
        }
        const token = await user.generateAuthToken()
        // console.log({token})
        res.send({user, token}) //user,token
    }catch(err){
        res.status(400).send({message: "bad request"})
    }
})

// user/me
router.get('/user/me', auth, async(req, res) => {
    // view logged in user profile
    res.send(req.user)
})

//user log out
router.post('/me/logout', auth, async(req, res) => {
    try {
        req.user.tokens =req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch (err){
        res.status(500).send(err)
    }
})

// update a users
router.patch('/:id', helper.get_user, async(req,res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.email != null ){
        res.user.email = req.body.email
    }
    if(req.body.password != null){
        res.user.password = req.user.password
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// delete a users
router.delete('/:id', helper.get_user, async (req,res) => {
    try{
        await res.user.remove() //?????
        res.json({message: "user is deleted"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router