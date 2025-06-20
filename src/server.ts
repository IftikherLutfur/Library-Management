import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

let server: Server;
const port = process.env.PORT || 5000;



async function main (){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.hyx8zzc.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to MongoDB');
        server = app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log("Error starting server:", error);
    }
}

main()