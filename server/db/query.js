import pkg from 'pg'
const {Pool} = pkg
const pool = new Pool({host:"localhost",port:5432,password:"1234567",database:"Biology",user:"postgres"})
async function query(query,params){
        return await pool.query(query,params)
}

export {query}
