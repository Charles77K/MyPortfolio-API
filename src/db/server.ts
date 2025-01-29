import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE?.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD as string
      ) as string
    );
    console.log("Connected to database");
  } catch (error) {
    console.error("an error occurred", error);
    process.exit(1);
  }
};

export default connectDB;
