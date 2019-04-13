const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordAttributes = {
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    instructor_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false
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

Record.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true // Only return one User
})

Record.virtual('instructor', {
    ref: 'User',
    localField: 'instructor_id',
    foreignField: '_id',
    justOne: true // Only return one User
})

Record.statics.findAvailableRecord = async function (event_id) {
    return this.find({ event_id, status: 'Waiting' })
}

module.exports = mongoose.model('Record', Record)