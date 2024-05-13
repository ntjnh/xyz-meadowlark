const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

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
