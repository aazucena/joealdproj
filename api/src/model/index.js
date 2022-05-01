import query from '../config/index.js'
import { format, schema, validate } from '../utilities/helper.js'

const model = {
    collection: (table = 'collection') => ({
        browse: async(params = {}) => {
            const {columnSet, values} = format.column(params)
            console.log('Browse:', params, columnSet, values)
            let sql = `SELECT * FROM ${table}${(columnSet) ? ` WHERE ${columnSet}` : ''}`
            if (!Object.keys(params).length) return await query(sql)
            return await query(sql, [...values])
        },
        read: async (params) => {
            const {columnSet, values} = format.column(params)
            console.log('Read:', params, columnSet, values)
            let sql = `SELECT * FROM ${table} WHERE ${columnSet}`
            return await query(sql, [...values]).then(_ => _[0])
        },
        create: async (data) => {
            var {columnSet, values} = format.insert_into(data)
            console.log('Add:', columnSet, values)
            const result = await query(`INSERT INTO ${table} ${columnSet}`, values)
            return result ? result.affectedRows : 0
        },
        update: async (id, data) => {
            const { columnSet, values } = format.column(data)
            console.log('Update:', id, data, columnSet, values)
            return await query(`UPDATE ${table} ${(columnSet) ? `SET ${columnSet}` : ''} WHERE id = ${id}`, values)
        },
        delete: async (id) => {
            console.log('Delete:', id)
            const result = await query(`DELETE FROM ${table} WHERE id = ${id}`)
            return result ? result.affectedRows : 0
        },
        getFields: async () => {
            console.log('Fields')
            return await query(`DESC ${table}`)
                .then(_ => _[0])
        },
    }),
    table: {
        list: async() => {
            console.log('Table List')
            return await query(`SHOW TABLES`)
                .then(_ => Object.values(_[0])
                    .map(obj => Object.values(obj)[0]))
        },
        create: async (table, params) => {
            var fields = (Array.isArray(params) === true) ?
                ((params.some(param => param?.field && param?.field === 'id')) ?
                    params : [{ field: "id", type: "int", null: false, default: null, auto_increment: true, }, ...params])
                :
                [{ field: "id", type: "int", null: false, default: null, auto_increment: true, }, params],
                formats = fields.map(_ => format.field(_)).join(', ')
            
            console.log('Table Create:', table, params, formats)

            var result = await query(`CREATE TABLE IF NOT EXISTS ${table} (${formats}, PRIMARY KEY (\`id\`))`)
            return (result) ? result.affectedRows : 0         
        },
        drop: async (table) => {
            console.log('Table Drop:', table)
            const result = await query(`DROP TABLE IF EXISTS ${table}`)
            return result ? result.affectedRows : 0
        }
    }
}
export default model