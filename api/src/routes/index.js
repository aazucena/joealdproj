import express from 'express'
import controller from '../controller/index.js'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: req })) // localhost:3000/api

router.get('/items/:collection', async (req, res, next) => {
    try {
        controller.collection(req.params.collection).browse(req, res, next)
    } catch (err) {
        next(err)
    }
})  // localhost:3000/api/collection

router.get('/items/:collection/id/:id', async (req, res, next) => {
    try {
        controller.collection(req.params.collection).read(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/id/1

router.patch('/items/:collection/update/id/:id/', async (req, res, next) => {
    try {
        controller.collection(req.params.collection).edit(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/update/id/1 , using patch for partial update

router.post('/items/:collection/add/', async (req, res, next) => {
    try {
        controller.collection(req.params.collection).add(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/add

router.delete('/items/:collection/delete/id/:id', async (req, res, next) => {
    try {
        controller.collection(req.params.collection).read(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/delete/id/1

router.get('/items/:collection/fields', async (req, res, next) => {
    try {
        controller.collection(req.params.collection).getFields(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/collection/fields

router.get('/tables', async (req, res, next) => {
    try {
        controller.table.list(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/tables

router.post('/tables/create/', async (req, res, next) => {
    try {
        controller.table.create(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/tables/create

router.delete('/tables/drop/:table', async (req, res, next) => {
    try {
        controller.table.drop(req, res, next)
    } catch (err) {
        next(err)
    }
}) // localhost:3000/api/tables/drop/:table


export default router