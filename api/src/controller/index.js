import 'dotenv/config'
import model from '../model/index.js'
import HttpException from '../utilities/http-exception.js'
const controller = (table = 'collection') => ({
    browse: async (req, res, next) => {
        let list = await model(table).browse();
        if (!list.length) {
            throw new HttpException(404, 'Item not found');
        }
        res.send(list);
        console.log(req);
    },

    read: async (req, res, next) => {
        const result = await model(table).read({ id: req.params.id });
        if (!result) throw new HttpException(404, 'Item not found');
        return res.send(result);
        console.log(req);
        //res.json({ result: result })
    },
    edit: async (req, res, next) => {
        // do the update query and get the result
        // it can be partial edit
        const result = await model(table).update(req.params.name, req.params.id);
        //if (!result) throw new HttpException(404, 'Something went wrong');
        const { affectedRows, changedRows, info } = result;
        res.send({ message, info });
        console.log(req);
        //res.json({  result: result })
    },
    add: async (req, res, next) => {
        const result = await model(table).create(req.params.name, req.params.id);
        //if (!result) throw new HttpException(500, 'Something went wrong');
        res.send(result);
        console.log(req);
        //res.json({ result: result })
    },
    delete: async (req, res, next) => {
        const result = await model(table).delete({ id: req.params.id });
        //if (!result) throw new HttpException(404, 'Item not found');
        res.send(result);
        console.log(req);
        //res.json({ result: result })
    },
})

export default controller