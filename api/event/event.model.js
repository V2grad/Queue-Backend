const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventAttributes = {
    creator_id : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    record_ids: [{ 
            type: Schema.ObjectId, 
            ref: 'Record' 
        }],
    tags: [{
        type: String
    }]
}

const Event = new Schema(eventAttributes)

// Specifying a virtual with a `ref` property is how you enable virtual population
Event.virtual('creator', {
    ref: 'User',
    localField: 'creator_id',
    foreignField: '_id',
    justOne: true // Only return one User
})

Event.virtual('records', {
    ref: 'Record',
    localField: 'record_ids',
    foreignField: '_id'
})

Event.statics.findOneByToken = function (token) {
    return this.findOne({
        token
    }).populate('event').exec()
}

Event.statics.findTokenByEventId = function (event_id) {
    return this.find({
        event_id
    }).exec()
}

Event.statics.create = async function (
    event, event_agent, ip
) {
    let token = await uidgen.generate() // -> 'B1q2hUEKmeVp9zWepx9cnp',
    // Instantiates new Event model
    const event = new this({
        event_id: event._id,
        event_agent: event_agent,
        ip: ip,
        token: token
    })

    // Return Event.save() Promise
    return event.save()
}



module.exports = mongoose.model('Event', Event)