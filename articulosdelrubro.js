// todo esto se ejecuta cuando se llama al <script> desde articulosdelrubro.html

// obtengo el rubro guardado
const rubro = localStorage.getItem('rubroSeleccionado');

// mostrar artículos de ese rubro en la grilla de articulosdelrubro.html
fetch('https://tiendaenbragado.onrender.com/articulosdelrubro', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rubro })   // pasamos el rubro al backend
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error('Error en la respuesta');
        }
        return resp.json(); // Convertimos la respuesta a JSON
    })
    .then(data => {
        // obtenemos la grilla vacía del html
        const grilla = document.getElementById('grilla');

        // Recorremos la lista y agregamos los artículos a la grilla
        data.forEach(articulo => {
            // crear un elemento div en el body (una caja que contiene todos los datos)
            let caja = document.createElement("div");
            caja.className = "caja";   // definimos una clase "caja"

            let desc = document.createElement('p');           // creo un párrafo
            desc.className = "descripcion";                   // clase para formato en CSS
            desc.innerHTML = `${articulo.descripcion}`;       // muestra el campo descripcion de la tabla en el párrafo
            caja.appendChild(desc);                           // agrego desc a la caja

            let imagen = document.createElement("img");       // crear una imagen
            imagen.src = "imagenes/" + `${articulo.imagen}`; // definir el archivo a mostrar
            imagen.className = "imagen";                      // definir una clase para usar en CSS
            caja.appendChild(imagen);                         // agrego la imagen a la caja

            let codigo = document.createElement('p');          // creo un párrafo
            codigo.className = "codigo";                       // clase para formato en CSS
            codigo.innerHTML = `${articulo.codigoBarras}`;     // muestra el campo codigoBarras de la tabla en el párrafo
            caja.appendChild(codigo);                          // agrego el código a la caja

            let venta = document.createElement('p');
            venta.className = "venta";
            venta.innerHTML = "$ " + `${articulo.venta}`;
            caja.appendChild(venta);

            // agregar la caja entera en la grilla
            grilla.appendChild(caja);
        });
    })
    .catch(error => {
        // En caso de error, mostramos un mensaje
        grilla.innerHTML = 'Error al cargar los datos: ' + error;
        console.error('Error al obtener los datos:', error);
    });