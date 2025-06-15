import express from "express";
import authRouter from "./routes/auth.routes.js";
import petsRouter from "./routes/pets.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use(authRouter);
app.use("/pets", petsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error del Servidor" });
});

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  });
}

export default app;