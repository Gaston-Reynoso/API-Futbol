import { Schema, model } from "mongoose";
//Estructura necesaria para que mongoose pueda entender los objetos.
//SCHEMA
const teamSchema = new Schema({
    name: {type: String, required: true, unique: true},
    province: {type: String, required: true},
    yearOfFoundation: {type: Number},
    liga: {type: String}
}, {versionKey: false})

//MODEL
const Team = model("Team", teamSchema)

export {Team}