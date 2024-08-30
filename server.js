import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { Greens, Protein, Carb, Topping, Dressing } from "./model.js"
//  import {routergreens} from "./routes/greens"
import cors from 'cors'
import { createBrotliCompress } from "zlib";
import { error } from "console";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000; //to use 5000 as default port if original port is in use.
const MONGOURL = process.env.MONGO_URL;

app.use(cors());//to allow the front end fetch data from the backend
app.use(express.json());//to convert data to json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//connection to database
function mongodb() {
    mongoose.connect(MONGOURL).then(() => {
        console.log('Successfully connected to database.')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
        .catch((error) => console.log(error));

}
mongodb();



//array for greens
const saladIgredientGreens = [{
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
    category: "Vegetable",
    price: 2
},
{
    _id: 4,
    name: "Iceberg",
    category: "Vegetables",
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
    toppingId: 3,
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

// Greens.insertMany(saladIgredientGreens)
//     .then(value => {
//         console.log("Saved Successfully");
//     })
//     .catch(error => {
//         console.log(error);
//     })

//Inserting protein
// Protein.insertMany(proteins)
// .then(value => {
//     console.log("Protein saved Successfully");
// })
// .catch(error => {
//     console.log(error);
// })



//inserting carbs
//    Carb.insertMany(carbs)
//     .then(value => {
//         console.log("Carbs Saved Successfully");
//     })
//     .catch(error => {
//         console.log(error);
//     })


//inserting toppings
// Topping.insertMany(topPingss)
// .then(value => {
//     console.log("Toppings Saved Successfully");
// })
// .catch(error => {
//     console.log(error);
// })


//inserting dressing
// Dressing.insertMany(dresSings)
// .then(value => {
//     console.log("Dressings Saved Successfully");
// })
// .catch(error => {
//     console.log(error);
// })

// app.use(routergreens);

//creating api routes to access data in mongodb below

//routes for greens============================================================

app.get('/greens', (req, res) => {  //well, regardless of the error E11000, greens is still been fetched from the database. Tested. It works, so lets 'pamper' the code and work with it.
    Greens.find()
        .then(greens => res.json(greens))
        .catch(err => res.json(err))
})

app.post('/greens', async (req, res) => {//Post route for adding more greens
    const addGreens = new Greens({
        _id: req.body._id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    const greenval = await addGreens.save();//to save request in mongodb
    res.json(greenval)//to save the request in json format
});
app.put('/greens/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id

    const updatedGreen = await Greens.findByIdAndUpdate(id, { ...req.body }, { new: true })

    res.json(updatedGreen)//to save the request in json format
});
app.delete('/greens/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id
    await Greens.findByIdAndDelete(id)

    res.json({ message: "Green deleted successfully" })//to save the request in json format
});




//routes protein=========================================================================================
app.get('/proteins', (req, res) => {
    Protein.find()
        .then(proteins => res.json(proteins))//fetch info from database and convert it to json format
        .catch(err => res.json(err))
})
           //=========post protein=============
app.post('/proteins', async (req, res) => {//Post route for adding more protein

    const addprotein = new Protein({
        proteinId: req.body.proteinId,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    const proteinval =await addprotein.save();
    res.json(proteinval);
    
});
   //============put protein=================
   app.put('/proteins/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id

    const updatedProtein = await Protein.findByIdAndUpdate(id, { ...req.body }, { new: true })

    res.json(updatedProtein)//to save the request in json format
});

  //=======================delete PROTEIN==================
  app.delete('/proteins/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id
    await Protein.findByIdAndDelete(id)
  });

  
//============================carb routes=========================================
app.get('/carbs', (req, res) => {
    Carb.find()
        .then(carbs => res.json(carbs))//fetch info from database and convert it to json format
        .catch(err => res.json(err))
})
//===================post carb=========================================
app.post('/carbs', async (req, res) => {//Post route for adding more protein

    const addcarb = new Carb({
        carbId: req.body.carbId,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    const carbval =await addcarb.save();
    res.json(carbval);
    
});
//---------------carb put------------------------------
app.put('/carbs/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id

    const updatedcarb = await Carb.findByIdAndUpdate(id, { ...req.body }, { new: true })

    res.json(updatedcarb)//to save the request in json format
});
//-----------------------------carb delete-------------------------------------

app.delete('/carbs/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id
    await Carb.findByIdAndDelete(id)
  });

//topping
app.get('/topping', (req, res) => {
    Topping.find()
        .then(toppings => res.json(toppings))
        .catch(err => res.json(err))
})
//---------------------post topping-----------------------------------

app.post('/topping', async (req, res) => {//Post route for adding more protein

    const addtopping = new Topping({
        toppingId: req.body.toppingId,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    const toppingbval =await addtopping.save();
    res.json(toppingbval);
})
//--------------------put TOPPING-----------------------------

app.put('/topping/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id

    const updatedtopping = await Topping.findByIdAndUpdate(id, { ...req.body }, { new: true })

    res.json(updatedtopping);
})
//--------------------DELETE topping-------------------------
app.delete('/topping/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id
    await Topping.findByIdAndDelete(id)
  });



//dressing
app.get('/dressing', (req, res) => {
    Dressing.find()
        .then(dressings => res.json(dressings))
        .catch(err => res.json(err))
})

//----------------------post dressing---------------------------------
app.post('/dressing', async (req, res) => {//Post route for adding more protein

    const adddressing = new Dressing({
        carbId: req.body.dressingId,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });
    const dressingval =await adddressing.save();
    res.json(dressingval);
    
});

//-------------------put dressing---------------------
app.put('/dressing/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id

    const updateddressing = await Dressing.findByIdAndUpdate(id, { ...req.body }, { new: true })

    res.json(updateddressing);
});

//-------------------delete dressing----------------------
app.delete('/dressing/:id', async (req, res) => {//Post route for adding more greens
    const id = req.params.id
    await Dressing.findByIdAndDelete(id);
  });


  //////HAAAAAAAAAAAA ,,,,,finalllllyyyyyyyyyyyyyyy!!!!!!!!!