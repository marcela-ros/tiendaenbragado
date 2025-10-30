// esta función está asociada a los botones del html
// tiene que mostrar los artículos del rubro recibido como parámetro

function mostrarArticulos(rubro) {
    // guardamos el rubro elegido
    localStorage.setItem('rubroSeleccionado', rubro);
    
    // redirigimos a la página donde se muestran los artículos
    window.location.href = 'articulosdelrubro.html';
}
