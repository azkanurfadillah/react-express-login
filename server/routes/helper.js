const User = require('../models/user')
const Park = require('../models/park')

exports.get_user = async function(req, res, next){
    try{
        user = await User.findById(req.params.id)
        if (user == null){
            return res.status(404).json({message: "user not found"})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
};

exports.get_park = async function(req, res, next) {
    try{
        park = await Park.findById(req.params.id)
        if (park == null){
            return res.status(404).json({message: "park not found"})
        } 
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    res.park = park
        next()
}

// module.exports = getUser