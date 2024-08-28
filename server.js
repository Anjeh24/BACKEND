import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import {Greens, Protein, Carb, Topping, Dressing} from "./model.js"
//  import {routergreens} from "./routes/greens"
import cors from 'cors'
import { createBrotliCompress } from "zlib";


const app = express();
dotenv.config();

const PORT = process.env.PORT ||  5000; //to use 5000 as default port if original port is in use.
const MONGOURL = process.env.MONGO_URL;

 app.use(cors());//to allow the front end fetch data from the backend
 app.use(express.json());//to convert data to json

//connection to database
function mongodb() {
mongoose.connect(MONGOURL).then(()=>{
    console.log('Successfully connected to database.')
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => console.log(error));

}
 mongodb();



//array for greens
 const saladIgredientGreens= [{
    _id: 1,
    name: "Romaine lettuce",
    category: "vegetable",
    price: 1
 },
 {
    _id: 2,
    name: 'Spinach',
    category: "Vegetable",
    price: 1.50
 },
 {
    _id: 3,
    name: "Kale",
    category:"Vegetable",
    price: 2
 },
 {
    _id: 4,
    name: "Iceberg",
    category:"Vegetables",
    price: 1
 }
 ]

 //array for proteins

 const proteins = [{
    proteinId: 1,
    name: "Chicken bits",
    category: "Protein",
    price: 2
 },
 {
    proteinId: 2,
    name: "Shrimp",
    category: "Protein",
    price: 2
 },
 {
    proteinId: 3,
    name: "Black beans",
    category: "Protein",
    price: 1
 },
 {
    proteinId: 4,
    name: "Tofu",
    category: "Protein",
    price: 1.50
 }
]

//array for carbs

const carbs = [{
    carbId: 1,
    name: "Cubed potato bits",
    category: "carb",
    price: 1
 },
 {
    carbId: 2,
    name: "Crouton",
    category: "carb",
    price: 1
 }
 
]

//array for topping


const topPingss = [{
    toppingId: 1,
    name: "Onion",
    category: "topping",
    price: .50
 },
 {
    toppingId: 2,
    name: "Tomato",
    category: "topping",
    price: .50
 },
 {
    toppingId:3,
    name: "Mixed bell peppers",
    category: "topping",
    price: .50
 },
]

//array for dressing

const dresSings = [
    {
       dressingId: 1,
        name: "Ranch",
        category: "dressing",
        price: .50
     },
     {
        dressingId: 2,
         name: "Red grape vinaigrette",
         category: "dressing",
         price: .50
      },
      {
        dressingId: 3,
         name: "House meringue sauce",
         category: "dressing",
         price: .50
      },
]

//inserting greens data

Greens.insertMany(saladIgredientGreens)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })

    //Inserting protein
    Protein.insertMany(proteins)
    .then(value => {
        console.log("Protein saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })



    //inserting carbs
   Carb.insertMany(carbs)
    .then(value => {
        console.log("Carbs Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })


    //inserting toppings
    Topping.insertMany(topPingss)
    .then(value => {
        console.log("Toppings Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })


    //inserting dressing
    Dressing.insertMany(dresSings)
    .then(value => {
        console.log("Dressings Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })

    // app.use(routergreens);
    
    //creating api routes to access data in mongodb below

    //routes for greens

app.get('/getgreens', (req, res) => {  //well, regardless of the error E11000, greens is still been fetched from the database. Tested. It works, so lets 'pamper' the code and work with it.
    Greens.find()
    .then(greens => res.json(greens))
    .catch(err => res.json(err))
})



//routes protein
app.get('/getproteins', (req, res) => {
    Protein.find()
     .then(proteins => res.json(proteins))//fetch info from database and convert it to json format
     .catch(err => res.json(err))
})


//carb
app.get('/getcarbs', (req, res) => {
    Carb.find()
    .then(carbs => res.json(carbs))//fetch info from database and convert it to json format
    .catch(err => res.json(err))
})

//topping
app.get('/gettopping', (req, res) => {
    Topping.find()
    .then(toppings => res.json(toppings))
    .catch(err => res.json(err))
})

//dressing
app.get('/getdressing', (req, res) => {
    Dressing.find()
    .then(dressings => res.json(dressings))
    .catch(err => res.json(err))
})
