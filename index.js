const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

//metodo de coneccion con MongoDb compass
mongoose.connect(
  "mongodb+srv://admin:Fgalvez2608@clustergrupo43.ayotlws.mongodb.net/bd_g43?retryWrites=true&w=majority"
);

//usuarios
const usuarioSchema = new mongoose.Schema({
  documento: String,
  nombre: String,
  edad: Number,
  telefono: String,
  fechaNacimiento: String,
  contrasenia: String,
  rol: String,
  direccion: String,
  correo: String
});

//vehiculos
const vehiculoSchema = new mongoose.Schema({
  propietario: String,
  placa: String,
  tipo: String,
  marca: String,
  linea: String,
  modelo: Number,
  cilindraje: String,
  capacidad: String,
  paisOrigen: String
});

//modelo usuarios
const usuarioModelo = mongoose.model("usuarios", usuarioSchema);

//modelo  vehiculos
const vehiculoModelo = mongoose.model("vehiculos", vehiculoSchema);

//metodo get para solicitud de peticiones
app.get("/", (request, response) => {
  response.send("uy me hiciste una petición");
});

//metodo get para obtener o buscar 1 usuario por documento
app.get("/UsuarioPorId", (request, response) => {
  usuarioModelo.find(
    { documento: request.body.documento | request.param("documento") },
    function (error, documentos) {
      response.send(documentos);
    }
  );
});

//metodo get para obtener o buscar 1 vehiculo por placa
app.get("/VehiculoPorPlaca", (request, response) => {
  vehiculoModelo.find(
    { placa: request.body.placa | request.param("placa") },
    function (error, placas) {
      response.send(placas);
    }
  );
});

//metodo get para obtener todos los usuarios 
app.get("/Usuarios", (request, response) => {
  usuarioModelo.find(function (error, documentos) {
    response.send(documentos);
  });
});

//metodo get para obtener todos los vehiculos 
app.get("/Vehiculos", (request, response) => {
  vehiculoModelo.find(function (error, placas) {
    response.send(placas);
  });
});

//metodo post para agregar usuario a base de datos
app.post("/AgregarUsuario", function (request, response) {
  let usuarioNuevo = new usuarioModelo({
    documento: request.body.documento,
    nombre: request.body.nombre,
    edad: request.body.edad,
    telefono: request.body.telefono,
    fechaNacimiento: request.body.fechaNacimiento,
    contrasenia: request.body.contrasenia,
    rol: request.body.rol,
    direccion: request.body.direccion,
    correo: request.body.correo
  });


//metodo para guardar y notificar el estado de la agregacion de un usuario
  usuarioNuevo.save(function (error, documento) {
    if (error) {
      response.send("Error en agregar usuario");
    } else {
      response.send("El usuario ha sido agregado");
    }
  });
});

//metodo post para agregar vehiculo a base de datos
app.post("/AgregarVehiculo", function (request, response) {
  let vehiculoNuevo = new vehiculoModelo({
    propietario: request.body.propietario,
    placa: request.body.placa,
    tipo: request.body.tipo,
    marca: request.body.marca,
    linea: request.body.linea,
    modelo: request.body.modelo,
    cilindraje: request.body.cilindraje,
    capacidad: request.body.capacidad,
    paisOrigen: request.body.paisOrigen
  });

//metodo para guardar y notificar el estado de la agregacion de un vehiculo
vehiculoNuevo.save(function (error, placa) {
  if (error) {
    response.send("Error en agregar vehiculo");
  } else {
    response.send("El vehiculo ha sido agregado");
  }
});
});

//metodo delete para eliminar un usuario
app.delete("/EliminarUsuario", function (request, response) {
  usuarioModelo.deleteOne(
    { documento: request.body.documento | request.param("documento") },
    function (error, documento) {
      if (error) {
        response.send("Error en eliminar usuario");
      } else {
        response.send("El usuario ha sido eliminado");
      }
    }
  );
});

//metodo delete para eliminar un vehiculo
app.delete("/EliminarVehiculo", function (request, response) {
  vehiculoModelo.deleteOne(
    { placa: request.body.placa | request.param("placa") },
    function (error, placa) {
      if (error) {
        response.send("Error en eliminar vehiculo");
      } else {
        response.send("El vehiculo ha sido eliminado");
      }
    }
  );
});

//metodo put para editar un usuario con filtro documento y campo a editar edad
app.put("/EditarUsuario", function (request, response) {
  const filter = { documento: request.body.documento };
  const update = { edad: Number(request.body.edad),
                   nombre: String (request.body.nombre),
                   telefono: String (request.body.telefono),
                   fechaNacimiento: String (request.body.fechaNacimiento),
                   contrasenia: String (request.body.contrasenia),
                   rol: String (request.body.rol),
                   direccion: String (request.body.direccion),
                   correo: String (request.body.correo)};

  console.log("filter: " + filter);
  console.log("update: " + update);

//metodo para encontrar con filtro y notificar el estado de la edicion
  usuarioModelo.findOneAndUpdate(filter, update, function (error, documento) {
    if (error) {
      console.log(error);
      response.send("Error en editar usuario");
    } else {
      response.send("El usuario ha sido editado");
    }
  });
});



//metodo put para editar un vehiculo con filtro plca y campo a editar marca
app.put("/Editarvehiculo", function (request, response) {
  const filter = { placa: request.body.placa };
  const update = { propietario: String(request.body.propietario),
                   tipo: String(request.body.tipo),
                    marca: String(request.body.marca), 
                    linea: String(request.body.linea),
                    modelo: String(request.body.modelo),
                    cilindraje: String(request.body.cilindraje),
                    capacidad: String(request.body.capacidad),
                    paisOrigen: String(request.body.paisOrigen)};

  console.log("filter: " + filter);
  console.log("update: " + update);

//metodo para encontrar con filtro y notificar el estado de la edicion
  vehiculoModelo.findOneAndUpdate(filter, update, function (error, placa) {
    if (error) {
      console.log(error);
      response.send("Error en editar vehiculo");
    } else {
      response.send("El vehiculo ha sido editado");
    }
  });
});

//metodo para que el sistema escuche las peticiones 
app.listen(3001, () => {
  console.log("escuchando...");
});
