const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect("mongodb+srv://rajaeriah2:rajaeriahporche21@firsttry.qbgok.mongodb.net/?retryWrites=true&w=majority&appName=FirstTry")
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error("Failed connection:", err));

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
    .catch(err => res.json(err))
})
 
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err))
 })
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})


app.listen(3002, () => {
    console.log("Server is running")
})