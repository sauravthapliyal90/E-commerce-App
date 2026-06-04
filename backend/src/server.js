import express from 'express';
import path from 'path';
import { clerkMiddleware } from '@clerk/express'

import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(clerkMiddleware()); //req.auth and req.session will be available in all routes after this middleware

const __direname = path.resolve();

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" })
})
// make our app ready for development
if (ENV.NODE_ENV === "production") {

    app.use(express.static(path.join(__direname, '../admin/dist')));
    
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__direname, "../admin", "dist", "index.html"));
    });
}

const startServer = async () => {
    await connectDB();
app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
    });
};

startServer();
