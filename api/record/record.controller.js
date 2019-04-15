const Record = require('./record.model')
const Event = require('../event/event.model')

exports.show = (req, res) => {
    let _id = req.header('user-id')
    let { id } = req.params

    Record.findById(id).then(r => {
        res.json({
            status: r.status,
            instructor: r.instructor_id ? r.instructor.display_name : 'Unknown Person'
        })
    }).catch(e => {
        res.status = 404
        res.json(e)
    })
}

exports.create = (req, res) => {
    let _id = req.header('user-id')
    let { event_id, tag } = req.body
    if (_id && event_id && tag) {
        Record.create({
            user_id: _id, 
            event_id, 
            tag
        }).then(r => {
            Event.findById(event_id).then(e => {
                e.record_ids.push(r._id)
                e.save().then(() => {
                    res.json(r)
                })
            })
        })
    } else {
        res.status = 404
        res.json({
            message: 'missing parameters'
        })
    }
}

exports.update = (req, res) => {
    let _id = req.header('user-id')
    let { id } = req.params
    let { status, tag } = req.body
    if (id && _id) {
        Record.findById(id).then(r => {
            if (r.event.isInstructor(_id)) {
                r.instructor_id = _id
                r.status = status
            } else if (r.user_id) {
                r.status = 'Finished'
            }
            
            // Allow Changes of Tags
            r.tag = tag

            r.save().then(r => {
                res.json(r)
            })
        }).catch(e => {
            res.status = 404
            res.json(e)
        })
    }
}

exports.delete = (req, res) => {
    // Soft Delete
}