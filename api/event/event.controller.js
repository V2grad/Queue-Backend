const Event = require('./event.model')

exports.show = (req, res) => {
    let _id = req.header('user-id')
    let _instructor = req.header('instroctor-key')
    let { id } = req.params
    if (id) {
       Event.findById(id).then(r => {
            if (r.isCreator(_id) || r.isInstructor(_instructor)) {
                res.json(r.populate('records'))
            } else {
                res.json({
                    title: r.title,
                    tags: r.tags
                })
            }
        }).catch(e => [
            res.json(e)
        ])
    } else {
        res.json({
            message: 'No Found'
        })
    }
}

exports.create = (req, res) => {
    let { title, tags } = req.body
    let _id = req.header('user-id')
    if (title && tags) {
        Event.create({title, tags, user_id: _id}).then(r => {
            res.json(r)
        }).catch(e => {
            res.json(e)
        })
    } else {
        res.json({
            message: 'No Found'
        })
    }
}

exports.update = (req, res) => {
    let _id = req.header('user-id')
    let { id } = req.params
    let { title, tags } = req.body
    if (id) {
       Event.findById(id).then(r => {
            if (r.isCreator(_id)) {
                r.title = title
                r.tags = tags
                r.save(e => {
                    res.json(e)
                })
            } 
        }).catch(e => {
            res.json(e)
        })
    } else {
        res.json({
            message: 'No Found'
        })
    }
}

exports.updateKey = (req, res) => {
    let _id = req.header('user-id')
    let { id } = req.params
    if (id) {
        Event.findById(id).then(r => {
            if (r.isCreator(_id)) {
                r.updateInstructorKey().then(r => {
                    res.json(r)
                })
            } else {
                res.json({
                    message: 'Not Creator'
                })
            }
        }).catch(e => {
            res.json(e)
        })
    } else {
        res.json({
            message: 'No Found'
        })
    }
}
 
exports.delete = (req, res) => {
    let _id = req.header('user-id')
    let { id } = req.params
    if (id) {
        Event.findById(id).then(r => {
            if (r.isCreator(_id)) {
                Event.deleteOne({_id: r._id}).then(r => {
                    res.json({
                        status: true
                    })
                })
            }
        }).catch(e => [
            res.json(e)
        ])
    } else {
        res.json({
            message: 'No Found'
        })
    }
}