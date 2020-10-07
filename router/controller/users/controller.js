const usersCollection = require('../../../model/user')

const createUser = (req, res) => {
  try {
    const {
      code,
      name,
      password,
      type,
      mobilePhone,
      email
    } = req.body
    const users = usersCollection.doc()
    users.set({
      users_code: code,
      users_name: name,
      password: password,
      type: type,
      mobile_phone_no: mobilePhone,
      email: email
    }, { merge: true })
      .then(() => {
        res.status(201).json({
          status: 201,
          message: 'Created Success'
        })
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getUser = (req, res) => {
  try {
    const users = usersCollection
    users.get()
      .then(snapshot => {
        const data = []
        snapshot.forEach(doc => {
          data.push(doc.data())
        })
        res.status(200).json(data)
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getUserById = (req, res) => {
  try {
    const { Id } = req.params
    usersCollection.where('users_code', '==', Id).get()
      .then(snapshot => {
        if (snapshot.empty) {
          res.status(404).json({
            status: 404,
            message: 'Data Not Found'
          })
        }
        snapshot.forEach(doc => {
          res.status(200).json(doc.data())
        })
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const updateUser = (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name,
        password,
        type,
        mobilePhone,
        email
      }
    } = req
    usersCollection.doc(Id).update({
      users_code: code,
      users_name: name,
      password: password,
      type: type,
      mobile_phone_no: mobilePhone,
      email: email
    })
      .then(() => {
        res.status(201).json({
          status: 201,
          message: 'Updated Success'
        })
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const deleteUser = (req, res) => {
  try {
    const { Id } = req.params
    usersCollection.doc(Id).delete()
      .then(
        res.status(200).json({
          status: 200,
          message: 'Deleted Success'
        })
      )
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser
}
