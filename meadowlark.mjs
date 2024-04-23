import express from 'express'
import { engine } from 'express-handlebars'

import * as handlers from './lib/handlers.mjs'

const app = express()

// Configure Handlebars view engine
app.engine('handlebars', engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(import.meta.dirname + '/public'))

// Set up routing
app.get('/', handlers.home)

app.get('/about', handlers.about)

// Custom 404 page
app.use(handlers.notFound)

// Custom 500 page
app.use(handlers.serverError)

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; ` + 
    `Press Ctrl-C to terminate.`)
})
