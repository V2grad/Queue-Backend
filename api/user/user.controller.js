const User = require('./user.model')

exports.userInfo = (req, res) => {
  let { id } = req.body

  if (id) {
    User.findById(id).then(r => {
      res.json(r)
    })
  } else {
    res.json({})
  }
}

exports.create = (req, res) => {
  User.create().then(r => {
    res.json(r)
  })
}

exports.update = (res, req) => {
    
}

exports.delete = (res, req) => {
    
}