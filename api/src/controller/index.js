
import 'dotenv/config'
import model from '../model/index.js'
import HttpException from '../utilities/http-exception.js'


const controller = {
    collection: (table = 'collection') => ({
        browse: async (req, res, next) => {
            let list = await model.collection(table).browse()
            if (!list.length) throw new HttpException(404, 'Item not found')
            res.send(list)
            console.log(req)
            res.json({ result: list })
        },

        read: async (req, res, next) => {
            const result = await model.collection(table).read({ id: req.params.id })
            if (!result) throw new HttpException(404, 'Item not found')
            res.send(result)
            console.log(req)
            res.json({ result: result })
        },
        edit: async (req, res, next) => {
            // do the update query and get the result
            // it can be partial edit
            const result = await model.collection(table).update(req.body.name, req.params.id)
            if (!result) throw new HttpException(404, 'Something went wrong')
            res.send(result)
            console.log(req)
            res.json({  result: result })
        },
        add: async (req, res, next) => {
            const result = await model.collection(table).create(req.body.id, req.body.name)
            if (!result) throw new HttpException(500, 'Something went wrong')
            res.sendStatus(result)
            console.log(req)
            res.json({ result: result })
        },
        delete: async (req, res, next) => {
            const result = await model.collection(table).delete(req.params.id)
            if (!result) throw new HttpException(404, 'Item not found')
            res.send('Item has been deleted')
            console.log(req)
            res.json({ result: result })
        },
        getFields: async (req, res, next) => {
            const result = await model.collection(table).getFields()
            if (!result) throw new HttpException(404, 'Item not found')
            res.send(result)
            console.log(req)
            res.json({ result: result })
        },
    }),
    table: {
        list: async (req, res, next) => {
            let list = await model.table.list()
            if (!list.length) throw new HttpException(404, 'Item not found')
            res.send(list)
            console.log(req)
            res.json({ result: list })
        },
        create: async (req, res, next) => {
            const result = await model.table.create(req.body.table, req.body.fields)
            if (!result) throw new HttpException(500, 'Something went wrong')
            res.send(result)
            console.log(req)
            res.json({ result: result })
        },
        drop: async (req, res, next) => {
            const result = await model.table.drop(req.params.table)
            if (!result) throw new HttpException(404, 'Item not found')
            res.send('Table has been dropped')
            console.log(req)
            res.json({ result: result })
        }
    }
}

export default controller