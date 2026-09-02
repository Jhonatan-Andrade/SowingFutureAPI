import mongoose from "mongoose";
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
// O Mongoose utilizará a URI definida no arquivo .env
const uri = process.env.MONGO_URI ;

await mongoose.connect(uri);

// Instância da conexão do Mongoose
export const db = mongoose.connection;