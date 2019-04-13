const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAttributes = {
    display_name: {
        type: String,
        default: 'Unknown Person'
    }, 
    event_id: {
        type: Schema.ObjectId, 
        required: false,
        ref: 'Event'
    }
}

const User = new Schema(userAttributes)

// Specifying a virtual with a `ref` property is how you enable virtual population
User.virtual('event', {
    ref: 'Event',
    localField: 'event_id',
    foreignField: '_id',
    justOne: true // Only return one User
})

User.statics.create = async function () {
    // let token = await uidgen.generate() // -> 'B1q2hUEKmeVp9zWepx9cnp',
    // Instantiates new Event model
    const event = new this()

    // Return Event.save() Promise
    return event.save()
}



module.exports = mongoose.model('User', User)