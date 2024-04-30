import { fortune } from './fortune.mjs'

export const home = (req, res) => res.render('home')

export const about = (req, res) => res.render('about', { fortune: fortune() })

export const notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
export const serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */
