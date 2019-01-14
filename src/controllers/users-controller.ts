import User from '../entities/user'

export default class {
  index(req, res) {
    User.find().then(users => {
      res.json(users)
    })
  }

  create(req, res) {
    User.insert(req.body)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.json(err)
      })
  }
}
