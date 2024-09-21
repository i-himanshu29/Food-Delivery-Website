import mongoose from "mongoose";

export const connectDB = async ()=>{
    // await mongoose.connect('mongodb+srv://mauryahimanshu979:XXDCvOJi0V2NzkWd@cluster0.pz64k14.mongodb.net/FoodyDB').then(()=>console.log("DataBase Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>console.log("DataBase Connected"));

}