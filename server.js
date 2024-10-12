const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express()
const port = 15214

// Middleware to parse the request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define a folder path where files will be saved
const saveDirectory = path.join(__dirname, 'dist/static/files')

// Ensure the save directory exists
if (!fs.existsSync(saveDirectory)) {
  fs.mkdirSync(saveDirectory)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, saveDirectory) // Save files to the 'files' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Use the original file name
  }
})

const upload = multer({ storage })

app.use(express.static(path.join(__dirname, 'dist/static')))
app.use(express.static(path.join(__dirname, 'dist/client')))

app.all('/', (req, res) => {
  res.sendFile('index.html')
})

// GET request - Display a list of files in the server directory
app.get('/files', (req, res) => {
  fs.readdir(saveDirectory, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory')
    }
    res.json({ files })
  })
})

// POST request - Save content to a file in the server path
app.post('/files', (req, res) => {
  const { fileName, content } = req.body

  // Validate inputs
  if (!fileName || !content) {
    return res.status(400).send('Missing fileName or content')
  }

  const filePath = path.join(saveDirectory, fileName)

  // Write content to a file
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).send('Error writing file')
    }
    res.send(`File '${fileName}' saved successfully`)
  })
})

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded')
  }

  res.send(`File '${req.file.originalname}' uploaded successfully.`)
})

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`)
})

const dbQuery = require('./service/index.js')
dbQuery()
