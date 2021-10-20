const express = require('express')
const app = express()
const port = 8080

// Routes
app.get('/', (req, res) => {
  res.send("Hello!")
})

app.get("/hello/:name?", (req, res) => {
  if (!req.params.name) 
    return res.send("Hello!")
  
    const msg = `Hello ${req.params.name}`
    res.send(msg)
})

// Running server
app.listen(port, () => {
  console.log("Runs on ", port)
})