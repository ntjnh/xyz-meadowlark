const { fortune } = require('./fortune.js')

const home = (req, res) => res.render('home')
const sectionTest = (req, res) => res.render('section-test')

const about = (req, res) => res.render('about', { fortune: fortune() })

const notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
const serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */

const newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

const newsletterSignupProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}

const newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}

module.exports = {
    home,
    sectionTest,
    about,
    notFound,
    serverError,
    newsletterSignup,
    newsletterSignupProcess,
    newsletterSignupThankYou
}
