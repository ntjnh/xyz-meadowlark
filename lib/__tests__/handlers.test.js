import { jest } from '@jest/globals'
import * as handlers from '../handlers.mjs'

test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.home(req, res)
    expect(res.render.mock.calls[0][0]).toBe('home')
})
