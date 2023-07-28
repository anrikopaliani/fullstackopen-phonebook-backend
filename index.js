const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (req, response) => {
  response.send(`
    <p>phone book has info for ${persons.length} people</p> 
    <br> 
    <p>${new Date().toLocaleString()}</p>
    `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "name is missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number is missing" });
  }

  const nameExists = persons.find((person) => person.name === body.name);

  if (nameExists) {
    return res.status(400).json({ error: "name is already taken" });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: Math.random() * 9999999,
    };

    persons = persons.concat(person);

    res.json(person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});