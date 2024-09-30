import express from "express"
import cors from "cors"

const app = express();
app.use(cors());

app.get('/getData',(req,res)=>{
    res.send("Salif Shaikh")
})


app.listen(4000,()=>{
    console.log("server is running on port 3000")
})