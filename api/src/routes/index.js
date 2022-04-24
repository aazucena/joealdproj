import express from 'express'
import controller from '../controller/index.js'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: req })) // localhost:3000/api

router.get('/:collection', async (req, res, next) => {
    try {
        controller(req.params.collection).browse(req, res, next)
    } catch (err) {
        next(err)
    }
})  // localhost:3000/api/collection

router.get('/:collection/id/:id', async (req, res, next) => {
    try {
        controller(req.params.collection).read(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/id/1

router.patch('/:collection/update/id/:id/', async (req, res, next) => {
    try {
        controller(req.params.collection).edit(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/update/id/1 , using patch for partial update

router.post('/:collection/add/', async (req, res, next) => {
    try {
        controller(req.params.collection).add(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/add

router.delete('/:collection/delete/id/:id', async (req, res, next) => {
    try {
        controller(req.params.collection).delete(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/delete/id/1

export default router