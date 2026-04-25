import "dotenv/config";
import app from "./app.js";
import connectDb from "../src/config/database.js"

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDb();
        
    app.listen(PORT, ()=> {
        console.log(`server running in port ${PORT}`);
    });
}

startServer();