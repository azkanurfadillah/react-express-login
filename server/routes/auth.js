const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await User.findOne({_id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

//         const bearerHeader = req.headers['authorization'];
//         // Check if bearer is undefined
//         if(typeof bearerHeader !== 'undefined') {
//           // Split at the space
//             const bearer = bearerHeader.split(' ');
//             // Get token from array
//             const bearerToken = bearer[1];
//             // Set the token
//             req.token = bearerToken;
//             // Next middleware
//             next();
//         } else {
//             // Forbidden
//             res.sendStatus(403);
//         }

//         const data = jwt.verify(req.token, 'secretkey')

//     try {
//         const user = await User.findOne({_id: data._id, 'tokens.token': token })
//         if (!user) {
//             throw new Error()
//         }
//         req.user = user
//         req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({ error: 'Not authorized to access this resource' })
//         }
    
// }

module.exports = auth