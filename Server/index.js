import {ConnectDB} from './db.js'
import { PORT } from './config.js'
import app from './App.js'

ConnectDB()


app.listen(PORT)

console.log("Server running in port ", PORT)

