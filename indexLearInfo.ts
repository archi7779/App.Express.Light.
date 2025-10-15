import express from 'express'
import { router } from './src/users/users.js';
const port = 8000;
const app = express();

app.use((req,res,next)=>{
    console.log("Перед всеми любыми обработчиками вызовется"); // просто вызов перед всеми обртчиками
    next();
})
app.all('/hello', (req, res, next)=>{
    console.log("dada all")
    next() // передаст вызов в /hello
}) // вызовется до всех обработчиков /hello но оч важен порядок записи!

const cb = (req, res, next) => {
    console.log('dada calbec')
    next() // передаст вызов в /hello
}
app.get('/hello', (req,res, next)=>{
        throw new Error("che kogo suka?");
})
app.use('/users', router); // когда запрос идет /users - начинает работать роутер а там /users/login;

//  app.get('/hello', cd (req,res)=>{ + в эту фн можно добавить калбек(или массив калбеков!) аргументом и он вызовется -алл - каллбек - res
//         res.send('Hi There') 
// })



//Обработка ощибок - после все app.use  ОБЯЗАТЕЛЬНО!


app.use((err, req, res, next)=>{
     res.status(401).send(err.message);
})  

app.listen(port,()=>{
    console.log('slushaem')
})