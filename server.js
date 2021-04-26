let express = require('express')
let routes = require('./routes/facts.js')
let path = require('path')

let app = express()


//could use app.use('/page', express.static(path.join(__dirname, 'contents')))
//which would be able to be referenced at http://127.0.0.1:3000/page/index.html
//note 'page' addition to url

app.use(express.static(path.join(__dirname, 'contents')))

app.use('/api', routes)

//error handlers
app.use(function(req, res, next) {
    res.status(404).send('Not found :(((')
})

app.use(function(err, req, res, next) {
    console.error('Request to ' + req.originalUrl + ' errored because\n', err)
    res.status(500).send('Server error')
})


let server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})