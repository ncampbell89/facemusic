const mongoose = require('mongoose')
const moment = require('moment')

const Friends = new mongoose.Schema({
    name: { type: String, default: '' },
    user_id: { type: String, ref: 'Users' },
    timeStamp: {
        type: String,
        default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
})

module.exports = mongoose.model('Friends', Friends);