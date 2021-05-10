let express = require('express');
let api_routes = require('./routes/api.js')
let path = require('path')

// Create web app
let app = express();

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

// be able to handle JSON requests and convert data to javascript
app.use(express.json())

//
app.use('/api', api_routes)

// error handling
app.use(function (req, res, next){
    res.status(404).send('Not Found') // if the request is not found
})

app.use(function (err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Server Error')
})


// Start server running
let server = app.listen(process.env.PORT || 3000, function (){
    console.log('Express server running on port ', server.address().port)
})
