import * as mysql from 'mysql2/promise'
import 'dotenv/config'
const query = async(sql, values='') => {
    var db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PSWD,
            database: process.env.MYSQL_DB,
            port: process.env.MYSQL_PORT,
        }) 
    return await db.execute(sql, values, (err, results, fields) => {
        console.log(results, fields)
    })
}
export default query
