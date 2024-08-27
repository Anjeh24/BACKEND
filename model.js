import mongoose from "mongoose";

//schema for salad greens
const saladIgredientGreensSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    category: String,
    price: Number
});

//protein schema
const proteinSchema = new mongoose.Schema({
    proteinId: Number,
    name:String,
    category:String,
    price:Number
})


//carbs schema
const  carbSchema = new mongoose.Schema({
    carbId: Number,
    name: String,
    category: String,
    price: Number
})


//toppings schema
const toppingSchema = new mongoose.Schema({
    toppingId: Number,
    name: String,
    category: String,
    price: Number
})

//dressing schema
const dressingSchema = new mongoose.Schema({
    dressingId: Number,
    name: String,
    category: String,
    price: Number
})

//creating model objects
 const Greens = mongoose.model('greens', saladIgredientGreensSchema);
const Protein = mongoose.model('protein', proteinSchema);
const Carb = mongoose.model('carb', carbSchema);
const Topping = mongoose.model('topping', toppingSchema);
const Dressing = mongoose.model('dressing', dressingSchema);


//Exporting model objects
 export  {
    Greens, Protein, Carb, Topping, Dressing
}