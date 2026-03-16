

import { app } from "./app";
const apiPort = process.env.PORT?Number(process.env.PORT): 3333

app.listen({
    host:'0.0.0.0',
    port:apiPort,
}).then( ()=>{
    console.log(`Server is Running : http://localhost:${apiPort}/`)
    console.log(``)
}) 