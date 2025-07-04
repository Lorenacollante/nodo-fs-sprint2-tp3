// app.mjs
import express from "express";
import { connectDB } from "./config/dbConfig.mjs"; 
import superHeroRoutes from "./routes/superHeroRoutes.mjs"; 

const app = express();
const PORT = process.env.PORT || 3000;

//es un middleware incorporado en Express 
app.use(express.json());
connectDB();//conecta a base de datos
app.use("/api", superHeroRoutes);
//para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});
//inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
