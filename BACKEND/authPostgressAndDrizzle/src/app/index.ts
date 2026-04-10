import express from 'express';

export function createApplication() {
    const app = express();

    //middlewares

    app.use(express.json())
    
    //routres 
    app.get('/',(req,res) => {
        return res.json({
            message:"only checking routes "
        })
    })

    return app;
}