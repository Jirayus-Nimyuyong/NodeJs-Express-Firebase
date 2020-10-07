const booksCollection = require('../../../model/book')

const createBook = (req, res) => {
  try {
    const { code, name } = req.body
    const books = booksCollection.doc()
    books.set({
      books_code: code,
      books_name: name
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

const getBook = (req, res) => {
  try {
    const books = booksCollection
    books.get()
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

const getBookById = (req, res) => {
  try {
    const { Id } = req.params
    booksCollection.where('books_code', '==', Id).get()
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

const updateBook = (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name
      }
    } = req
    booksCollection.doc(Id).update({
      books_code: code,
      books_name: name
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

const deletBook = (req, res) => {
  try {
    const { Id } = req.params
    booksCollection.doc(Id).delete()
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
  createBook,
  getBook,
  getBookById,
  updateBook,
  deletBook
}
