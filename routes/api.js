let express = require('express');
let db = require('../models')
let Student = db.Student

let router = express.Router();

router.get('/students', function (req, res, next){
    Student.findAll({order: ['present', 'name']}).then(students => {
        return res.json(students)
    }).catch(err => next(err))
})

router.post('/students', function (req, res, next){
    Student.create(req.body).then(data => {
        return res.status(201).send('created')
    }).catch( err => {
        // handle user errors like missing starid or name
        if (err instanceof db.Sequelize.ValidationError) {
            // respond with 400 Bad Request error code
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        }
        // else, unexpected errors that user has nothing to do with
        return next(err)
    })
})

// edit student - patch

router.patch('/students/:id', function (req, res, next) {
    let studentID = req.params.id // the id in the request
    let updatedStudent = req.body // data sent with the request
    Student.update(updatedStudent, {where: {id: studentID}}).then((rowsModified) => {
        let numOfRowsModified = rowsModified[0] // num of rows modified
        if (numOfRowsModified == 1) { // if it is 1, that means it worked
            return res.send('Okay')
        } else { // if student not found / (no rows)
            return res.status(404).json(['Student with that id not found'])
        }
    }).catch(err => {
        // if a validation error happens, let the user know (Bad Request)
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            // unexpected error
            return next(err)
        }
    })
})

router.delete('/students/:id', function (req, res, next) {
    let studentID = req.params.id // the id in the request
    Student.destroy({where: {id: studentID}}).then((rowsDeleted) => {
        if (rowsDeleted == 1) {
            return res.send('ok')
        } else { // if not found
            return res.status(404).json(['Not found'])
        }
    }).catch(err => next(err)) // unexpected errors
})


module.exports = router
