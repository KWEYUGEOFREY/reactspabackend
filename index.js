const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

// Custom token to log the body of POST requests
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  });
  
// Use morgan with custom format that includes body data for POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons =
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
    
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  app.get('/info', (request, response) => {
    const personsCount = persons.length
    const date = new Date()
  
    response.send(`
      <p>Phonebook has info for ${personsCount} people</p>
      <p>${date}</p>
    `);
  })

  
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).send(`Person with id ${id}  not found`)
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const initialPersonsLength = persons.length
    persons = persons.filter(person => person.id !== id)
  
    if (persons.length < initialPersonsLength) {
      response.status(204).send(`deleted successfully`)
    } else {
      response.status(404).send({ error: 'Person not found' })
    }
  })
  

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'Name or number is missing' })
    }
  
    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
      return response.status(400).json({ error: 'Name must be unique' })
    }
  
    const newPerson = {
      id: Math.floor(Math.random() * 10000),
      name: body.name,
      number: body.number
    }
  
    persons.push(newPerson)
    response.json(newPerson)
  })
  
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)