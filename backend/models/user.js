import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    disease: {
        type: String
    },
    family_member_name: {
        type: String,
        required: true
    },
    family_member_phone_number: {
        type: Number,
        required: true
    }
})

export const users = mongoose.model('user', schema);


const medSchema = new mongoose.Schema({
    disease: {
        type: String
    },
    medicine_name: {
        type: String
    },
    recommended_timings: {
        type: Array
    }
})

export const med = mongoose.model('medicine', medSchema)

const timingsSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    before_breakfast:{
        type:Boolean
    },
    after_breakfast:{
        type:Boolean
    },
    before_lunch:{
        type:Boolean
    },
    after_lunch:{
        type:Boolean
    },
    before_dinner:{
        type:Boolean
    },
    after_dinner:{
        type:Boolean
    },
    custom:{
        type:Number
    },
    recommended_timings:{
        type:Boolean
    } 
})

export const timings = mongoose.model('ReminderTiming',timingsSchema)


const scheduleSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    schedule:{
        type:Array // this array will contain objects {success:Boolean , time:Number}
    }
})

export const schedule = mongoose.model('table',scheduleSchema)