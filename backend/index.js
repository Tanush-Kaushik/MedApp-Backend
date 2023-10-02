import express from "express"
import mongoose from "mongoose";
import { router } from "./routes/auth.js";
import { schedule } from "./models/user.js";

const app = express()
const port = 5000

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())
app.use(router)

mongoose.connect('mongodb://127.0.0.1:27017', {
  dbName: 'MedAPI'
}).then(() => console.log("Database connected")).catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, async () => {

  //   await med.create({
  //     disease:"hernia",
  //     medicine_name:"med1",
  //     recommended_timings:[8,13,22]
  // })

  // await schedule.create({
  //   userId:'6509e6c366fa11bf73a110ca',
  //   schedule:[{time:7,success:true},{time:9,success:false},{time:10,success:true}]
  // })
  
  console.log(`App listening on port ${port}`)
})