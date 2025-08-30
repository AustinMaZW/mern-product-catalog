import express from "express";
import dotenv from "dotenv"; // used to access .env variables
import path from "path"; // from node
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use(express.json()); // middleware that allows us to accept json DATA in req.body

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
