import express,{Request, Response} from 'express'
const app = express()
const port:number = 3000
app.get("/", (req:Request, res:Response) => {
   res.status(200).json({
    msg: "Hello World"
   })

})
app.listen(port, () =>{
    console.log(`The server is running at : http://localhost:${port}`)
})