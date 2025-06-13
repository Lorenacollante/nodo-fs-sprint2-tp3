// src/controllers/superheroesController.mjs
import {
  
  obtenerTodosLosSuperheroes,
  buscarSuperheroePorAtributo, 
  obtenerSuperheroesMayoresDe30,
  obtenerSuperheroePorid,        } from "../services/superheroeService.mjs";
import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;

    const idRecibido = id;
    console.log("Estoy en la capa controlador,obtenerSuperheroePorIdController", idRecibido);
    
    const superheroe = await obtenerSuperheroePorid(idRecibido);
    //creo otra constante y un consol
    const resultadoServicio = superheroe;
    console.log( "Estoy en capa del Controlador (obtenerSuperheroePorIdController): Resultado del servicio:",  resultadoServicio);    
    
    if (!resultadoServicio) {

      console.log(
        "Estoy en la capa  del Controlador (obtenerSuperheroePorIdController): Superhéroe no encontrado para ID:",
        idRecibido
      );
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener el superheroe",
      error: error.message,
    });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();

    
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superheroes",
      error: error.message,
    });
  }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    
    const { atributo, valor } = req.params;

    
    const superheroes = await buscarSuperheroePorAtributo(atributo, valor);

    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({
          mensaje: `No se encontraron superheroes con ${atributo}: ${valor}`,
        }); 
    }
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar superheroes por atributo", 
      error: error.message,
    });
  }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {

  try {
    const superheroes = await obtenerSuperheroesMayoresDe30(); 

    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes mayores de 30 años" });
    }
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener superheroes mayores de 30",
      error: error.message,
    });
  }
}
