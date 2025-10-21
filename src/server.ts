

import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const app = fastify();
app.register(cors, {
    origin: [
        "http://localhost:5173",
    ],
    credentials: true,
});


app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
})

app.listen({
    host:'0.0.0.0',
    port:process.env.PORT?Number(process.env.PORT): 3333,

}).then( ()=>{
    console.log(`Server is Running`)
    console.log(`http://localhost:${process.env.PORT}`)
}) 