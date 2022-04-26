import query from '../config/index.js'
import { multipleColumnSet } from '../utilities/helper.js'

const model = (table = 'collection') => ({
    browse: async(params = {}) => {
        const {columnSet, values} = multipleColumnSet(params)
        let sql = `SELECT * FROM ${table}${(columnSet) ? ` WHERE ${columnSet}` : ''}`
        console.log(sql)
        if (!Object.keys(params).length) return await query(sql)
        return await query(sql, [...values])
    },
    read: async (params) => {
        const {columnSet, values} = multipleColumnSet(params)
        let sql = `SELECT * FROM ${table} WHERE ${columnSet}`
        // return back the first row of table
        return await query(sql, [...values]).then(_ => _[0])
    },
    create: async (id, name) => {
        const result = await query(`INSERT INTO ${table} (id, name) VALUES (${id}, '${name}')`)
        return result ? result.affectedRows : 0
    },
    update: async (params, id) => {
        return await query(`UPDATE ${table} SET name = '${params}' WHERE id = ${id}`)
    },
    delete: async (id) => {
        const result = await query(`DELETE FROM ${table} WHERE id = ?`, [id])
        return result ? result.affectedRows : 0
    }
})
export default model