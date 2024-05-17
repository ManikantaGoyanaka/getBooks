const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'goodreads.db')
let db = null
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server Running at https://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDbAndServer()

app.get('/books/', async (request, response) => {
  const getBooksQuery = `SELECT * FROM book order by book_id`
  const bookArray = await db.all(getBooksQuery)
  response.send(bookArray)
})
