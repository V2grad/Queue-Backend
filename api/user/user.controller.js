const User = require('./user.model')

exports.userInfo = (req, res) => {
  let { id } = req.params

  if (id) {
    User.findById(id).then(r => {
      res.json(r)
    }).catch(e => {
      res.json(e)
    })
  } else {
    res.status = 404
    res.json({})
  }
}

exports.create = (req, res) => {
  User.create().then(r => {
    res.json(r)
  })
}

exports.update = (req, res) => {
  let { id } = req.params
  let { display_name } = req.body
  return User.findById(id).then(r => {
    r.display_name = display_name
    return r.save().then(m => {
      res.json(m)
    }) 
  }).catch(e => {
    res.status = 404
    res.json(e)
  })
}

exports.delete = (res, req) => {
  let { id } = req.params
  User.findByIdAndDelete(id).then(r => {
    res.json(r)
  }).catch(e => {
    res.status = 404
    res.json(e)
  })
}