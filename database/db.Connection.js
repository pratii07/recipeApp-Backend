import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI,{
      dbName: "RecipeApp"
  }).then(() => {
      console.log("Database connected pratuuu");
  }).catch((err) => {
      console.log("Database connection failed", err);
  });
}