const express = require('express')
const app = express()

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
  
  

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)