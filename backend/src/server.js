import express from 'express';
import path from 'path';
import { ENV } from './config/env.js';

const app = express();

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

app.listen(ENV.PORT, () => {
    console.log('Server is running on port 3000');
});

