import { Terminal } from "@es-js/terminal";
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";

async function inicio() {
  Terminal.log("Hola! Ingresa la palabra secreta:");

  var secreto = await Terminal.leer();

  var dni = "95793066"; // Ingresa tu DNI aquí 👈

  if (await validarSecreto(dni, secreto)) {
    await mostrarCotizacion();
  } else {
    Terminal.log("Palabra secreta inválida");
  }

  Terminal.log("Presiona ENTER para volver a ingresar");

  await Terminal.leerEnter();

  Terminal.clear();

  inicio();
}

async function mostrarCotizacion() {
  const dolarBlue = await obtenerJson('https://dolarapi.com/v1/dolares/blue');

  // Mostrar cotización
  Terminal.log("Cotización del Dólar Blue en Argentina:");
  Terminal.log(`Fecha: ${new Date().toLocaleDateString()}`);
  Terminal.log(`Precio de compra: ${dolarBlue.compra}`);
  Terminal.log(`Precio de venta: ${dolarBlue.venta}`);
  
  // Calcular promedio
  const promedio = (dolarBlue.compra + dolarBlue.venta) / 2;
  Terminal.log(`Promedio: ${promedio}`);
}

inicio();
