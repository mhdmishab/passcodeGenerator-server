import express, { NextFunction, Request, Response } from 'express';
import router from './routes/route';
import morgan from 'morgan'
import { db } from './dbConnection';
import cors from 'cors'

db();



const app=express();
// app.use(
//     cors({
//       credentials: true,
//       origin: ['http://127.0.0.1:5173','https://passcrafter-x.netlify.app' , "https://passcrafter-x.netlify.app"]
     
//     })
//   );

app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173','https://passcodegeneratorz.netlify.app'],
      optionsSuccessStatus: 200
    })
  );
  
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));



app.use('/api',router)

const port=8080;
app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});