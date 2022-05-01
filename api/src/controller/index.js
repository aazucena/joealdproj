
import 'dotenv/config'
import model from '../model/index.js'
import HttpException from '../utilities/http-exception.js'


const controller = {
    collection: (table = 'collection') => ({
        browse: async (req, res, next) => {
            let list = await model.collection(table).browse()
            if (!list.length) throw new HttpException(404, 'Item not found')
            res.send({ data: list[0], meta: list[1]})
        },
        read: async (req, res, next) => {
            const result = await model.collection(table).read({ id: req.params.id })
            if (!result) throw new HttpException(404, 'Item not found')
            res.send(result)
        },
        edit: async (req, res, next) => {
            const result = await model.collection(table).update(req.params.id, req.body )
            if (!result) throw new HttpException(404, 'Something went wrong')
            res.send('Item has been updated')
        },
        add: async (req, res, next) => {
            await model.collection(table).create(req.body)
            res.send('Item has been created')
        },
        delete: async (req, res, next) => {
            const result = await model.collection(table).delete(req.params.id)
            //if (!result) throw new HttpException(404, 'Item not found')
            res.send('Item has been deleted')
        },
        getFields: async (req, res, next) => {
            const result = await model.collection(table).getFields()
            if (!result) throw new HttpException(404, 'Item not found')
            res.send(result)
        },
    }),
    table: {
        list: async (req, res, next) => {
            let list = await model.table.list()
            if (!list.length) throw new HttpException(404, 'Item not found')
            res.send(list)
        },
        create: async (req, res, next) => {
            await model.table.create(req.body.table, req.body.fields)
            res.send('Table has been created')
        },
        drop: async (req, res, next) => {
            const result = await model.table.drop(req.params.table)
            if (!result) throw new HttpException(404, 'Item not found')
            res.send('Table has been dropped')
        }
    }
}

export default controller