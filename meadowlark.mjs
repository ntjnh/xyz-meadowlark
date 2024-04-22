import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

// Configure Handlebars view engine
app.engine('handlebars', engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(import.meta.dirname + '/public'))

// Set up routing
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const fortunes = [
        `Conquer your fears or they will conquer you.`,
        `Rivers need springs.`,
        `Do not fear what you don\'t know.`,
        `You will have a pleasant surprise.`,
        `Whenever possible, keep it simple.`,
    ]

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', {fortune: randomFortune})

})

// Custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// Custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; ` + 
    `Press Ctrl-C to terminate.`)
})
