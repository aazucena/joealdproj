import query from '../config/index.js'
import { multipleColumnSet } from '../utilities/helper.js'

const model = (table = 'collection') => ({
    browse: async(params = {}) => {
        const { columnSet, values } = multipleColumnSet(params)
        let sql = `SELECT * FROM ${table}${(columnSet) ? ` WHERE ${columnSet}` : ''}`
        console.log(sql)
        if (!Object.keys(params).length) return await query(sql)
        return await query(sql, [...values])
    },
    read: async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        let sql = `SELECT * FROM ${table} WHERE ${columnSet}`
        // return back the first row of table
        return await query(sql, [...values]).then(_ => _[0])
    },
    create: async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        //const sql = `INSERT INTO ${table} (${columnSet}) VALUES (${values})`
        const result = await query(`INSERT INTO ${table} (${columnSet}) VALUES (${values})`)
        return result ? result.affectedRows : 0
    },
    update: async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        return await query(`UPDATE ${table} SET ${columnSet} WHERE id = ?`, [...values, id])
    },
    delete: async (id) => {
        const data = Object.values(id);
        const result = await query(`DELETE FROM ${table} WHERE id=${data}`)
        return result ? result.affectedRows : 0
    }
})
export default model