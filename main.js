// lo primero es obtener la referencia a mi textarea y a mi button
const jsonForm = document.querySelector("#jsonform");
const csvForm = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

// vamos a empezar con el listener para mi botton
bConvert.addEventListener("click", (e) => {
  convertJSONtoCSV();
});

// por aca la definimos
function convertJSONtoCSV() {
  let json;
  let keys = []; // aqui guardo los nombres de las propiedades
  let values = []; // aqui guardo los valores

  try {
    json = JSON.parse(jsonForm.value); // este try es si no es un json
  } catch (error) {
    console.log("Formato incorrecto JSON", error);
    alert("Formato incorrecto JSON");
    return;
  }
  if (Array.isArray(json)) {
    // validamos que sea un arreglo
    //algoritmo
    json.forEach((item) => {
      const nkeys = Object.keys(item); // aqui voy a obtener cada una de las propiedades de mi objeto
      if (keys.length === 0) {
        // aqui validamos// quiere decir que no hay nada
        keys = [...nkeys]; // si es la 1era vez que recorro el arreglo esta vacio por lo tanto
      } else {
        // voy a asignarle los headers o las cabeceras para poder usarlas mas adelante
        if (nkeys.length !== keys.length) {
          // si ya tiene algo asignado necesito otra validacion
          throw new Error("Number of keys are different");
        } else {
          console.log("Ok", nkeys);
        }
      }
      const row = keys.map((k) => {
        // cuando manejamos objetos, para poder acceder al valor de un objeto
        return item[k]; // tengo que pasarlo entre corchetes el nombre de la clave de la propiedad
      }); // si ya tengo las propiedades simplemente lo recorro y extraigo los valores en el forEach;
      values.push([...row]);
    });
    console.log(keys, values);
    values.unshift(keys); // con esto voy a agregar los nombres de las propiedades hasta arriba
    const text = values.map((v) => v.join(",")).join("\n"); // transformamos esto a texto
    csvForm.value = text;
  } else {
    alert("No es un arreglo de objetos");
  }
}
