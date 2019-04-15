const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uuidv4 = require('uuid/v4');

const eventAttributes = {
    creator_id : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    instructor_key: {
        type: String,
        required: true
    },
    record_ids: [{ 
            type: Schema.ObjectId, 
            ref: 'Record' 
        }],
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        default: null
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

Event.statics.create = async function (
    {title, tags, user_id}
) {
    
    // Instantiates new Event model
    const event = new this({
        title, tags, creator_id: user_id, instructor_key: uuidv4()
    })

    // Return Event.save() Promise
    return event.save()
}

Event.methods.updateInstructorKey = async function() {
    this.instructor_key = uuidv4();
    return this.save()
}

Event.methods.isInstructor = function (id) {
    return this.instructor_key == id
}

Event.methods.isCreator = function (id) {
    return this.creator_id == id
}



module.exports = mongoose.model('Event', Event)