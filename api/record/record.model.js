const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordAttributes = {
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event' 
    },
    tag: {
        type: String
    },
    status: {
        type: String,
        default: 'Waiting'
    }
}

const Record = new Schema(recordAttributes)

Record.virtual('event', {
    ref: 'Event',
    localField: 'event_id',
    foreignField: '_id',
    justOne: true // Only return one User
})

module.exports = mongoose.model('Record', Record)