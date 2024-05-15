const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const { section } = require('./lib/helpers.js')
const handlers = require('./lib/handlers.js')
const app = express()

// Disable X-Powered-by Express header
app.disable('x-powered-by')

// Configure Handlebars view engine
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section
    }
}))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* eslint-disable no-undef */
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
/* eslint-enable no-undef */

// Set up routing
app.get('/', handlers.home)

app.get('/about', handlers.about)

// Newsletter form - browser
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// Newsletter form - fetch
app.get('/newsletter', handlers.newsletter)
app.get('/api/newsletter-signup', handlers.api.newsletterSignup)

// Photo upload form
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
        console.log('got fields: ', fields)
        console.log('and files: ', files)
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.api.vacationPhotoContestError(req, res, err.message)
        handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})

// Custom 404 page
app.use(handlers.notFound)

// Custom 500 page
app.use(handlers.serverError)

// Only start server if app is run from command line 
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}; ` + 
        `Press Ctrl-C to terminate.`)
    })
} else {
    module.exports = app
}
