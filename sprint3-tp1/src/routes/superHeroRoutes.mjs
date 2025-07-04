
//creo archivo de rutas
import express from "express";//importo la ruta desde Express
import SuperHero from "../models/SuperHero.mjs";

const router = express.Router();// se crea una instancia de Route

/* Agregar un endpoint que realize una peticion get que nos devuelva 
lista de todos los  superheroes*/
router.get("/heroes", async (req, res) => {
  try {
    const todosSuperheroes = await SuperHero.find({});
    res.json(todosSuperheroes);//cambie res.send  x que con json automaticamente establece el encabezado
  } catch (error) {
      console.error(error);//para depuracion de error
    res.status(500).send({ message: "Error al obtener todos los superhéroes" });
  }
});
/*Agrega un endpoint que al realizarle una peticion 
post cree e inserte un nuevo superheroe
y nos devuelva el superheroe creado */
router.post("/heroes", async (req, res) => {
  try {
    const superHeroeNuevo = new SuperHero(req.body);
    await superHeroeNuevo.save();
    res.status(201).json(superHeroeNuevo);//con esto aviso al cliente que la operacion fue exitosa y que ingreso un nuevo recurso

    console.log(superHeroeNuevo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al crear un superheroe" });
  }
});

/*Agrega un endpoint que al realizarle una peticion
PUT actualice un superheroe y nos devuelva 
todos los superheroes actualizados */
router.put("/heroes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const heroActual = await SuperHero.findByIdAndUpdate(id, req.body, {
      new: true,
    });
      if (!heroActual) {
         return res.status(404)
            .send({mensaje: `No se encontro un superheroe con ID:${id}para actualizar.`});
      }
    res.send(
      `Superheroe con ID: ${id} ha sido actualizado : ${heroActual}`
    );
  } catch (error) {
      console.error('Error al actualizar supeheroe:',error);//para mejorar el manejo de error
    res.status(500).send({ message: "Error al actualizar un superheroe" });
  }
});

/*Agrega un endpoint que al realizarle una peticion DELETE
borre un supeheroe por ID en la base de datos 
y nos devuelva el superheroe borrado */
router.delete("/heroes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const heroEliminadoporId = await SuperHero.findByIdAndDelete(id);

      if (!heroEliminadoporId) {
          res
              .status(404)
              .send({ message: `No se encontró un superhéroe con ID: ${id}` });
      } else {
          res.status(200).json({mensaje: `Superheroe con ID: ${id} eliminado correctamente`, deletedHero: heroEliminadoporId});
    }
  } catch (error) {
    res.status(500).send({ message: "Error al crear un superheroe" });
  }
});

/*Agregar un endpoint que realize una peticion DELETE borre un supeheroe por
nombre del supeheroe en la base de datos 
y nos devuelva el supeheroe borrado */
router.delete("/heroes/nombre/:nombreSuperHeroe", async (req, res) => {
  try {
   
    const { nombreSuperHeroe } = req.params;
    console.log(
      "Estoy en la capa de superheroRutes, en la funcion borrar DELETE, y me llego como parametro el nombre superheroe:", nombreSuperHeroe    );
    const heroEliminadoporNombre = await SuperHero.findOneAndDelete({
      nombreSuperheroe: nombreSuperHeroe,
    });
    console.log("El superheroe que espero eliminar:", heroEliminadoporNombre);
    if (!heroEliminadoporNombre) {
      res
        .status(404)
        .send({
          message: `No se encontró un superhéroe con nombre: ${nombreSuperHeroe}`,
        });
    } else {
        res.status(200).json({ mensaje: `El superheroe ${nombreSuperHeroe} ha sido eliminado`, deletedHero: heroEliminadoporNombre });
    }
  } catch (error) {
      console.error('Error al eliminar supeheroe por nombre:',error);
      
    res.status(500).send({ message: "Error al crear un superheroe" });
  }
});

export default router;
