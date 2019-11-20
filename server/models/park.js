const moongose = require('mongoose')
const parkSchema = new moongose.Schema({
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: false
    },
    kotamadya: {
        type: String,
        required: true
    },
    jenis_taman: {
        type: String,
        required: true  
    }
})

module.exports = moongose.model('Park', parkSchema)