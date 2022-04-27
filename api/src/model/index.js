import query from '../config/index.js'
import { format, schema, validate } from '../utilities/helper.js'

const model = {
    collection: (table = 'collection') => ({
        browse: async(params = {}) => {
            const {columnSet, values} = format.column(params)
            let sql = `SELECT * FROM ${table}${(columnSet) ? ` WHERE ${columnSet}` : ''}`
            if (!Object.keys(params).length) return await query(sql)
            return await query(sql, [...values])
        },
        read: async (params) => {
            const {columnSet, values} = format.column(params)
            let sql = `SELECT * FROM ${table} WHERE ${columnSet}`
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
        },
        getFields: async () => {
            return await query(`DESC ${table}`)
                .then(_ => _[0])
        },
    }),
    table: {
        list: async() => {
            return await query(`SHOW TABLES`)
                .then(_ => Object.values(_[0]))
        },
        create: async (table, params) => {
            var fields = (Array.isArray(params) === true) ?
                ((params.some(param => param?.field && param?.field === 'id')) ?
                    params : [{ field: "id", type: "int", null: false, default: null, auto_increment: true, }, ...params])
                :
                [{ field: "id", type: "int", null: false, default: null, auto_increment: true, }, params]
            var formats = fields.map(_ => format.field(_)).join(', '),
                result = await query(`CREATE TABLE IF NOT EXISTS ${table} (${formats}, PRIMARY KEY (\`id\`))`)
            console.log(`CREATE TABLE IF NOT EXISTS ${table} (${formats}, PRIMARY KEY (\`id\`))`, result)
            return (result) ? result.affectedRows : 0         
        },
        drop: async (table) => {
            const result = await query(`DROP TABLE IF EXISTS ${table}`)
            return result ? result.affectedRows : 0
        }
    }
}
export default model