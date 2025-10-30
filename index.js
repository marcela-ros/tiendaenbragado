// 1. SERVIDOR
// importar módulo express
const express = require("express");

// crear un objeto servidor
const servidor = express();

// definir carpeta de trabajo para archivos estáticos html
const path = require("path");
servidor.use(express.static(path.join(__dirname, ".")));

// Definir página principal
servidor.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// activar el servidor en el puerto 3000 
// método listen: tiene 2 parámetros: un puerto y una función para dar un mensaje
const PORT = process.env.PORT || 3000; // render puede asignar un puerto distinto...
servidor.listen(3000,
    function () {
        console.log(`Servidor activo en puerto ${PORT}`);
    }
);

// Definir que entienda formato json y html
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

// para permitir acceso desde otros puertos
// lo instalamos con: npm install cors
const cors = require("cors");
servidor.use(cors());

// 2. MYSQL *****************************************************************************
// importar módulo MySQL2 para poder conectar con base web (aiven)
const mysql = require("mysql2");

/* crear la conexión local a MySQL: CHEQUEAR LOS DATOS DE ACCESO
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "practicas"
});
*/

// Conexión web con Aiven
var conexion = mysql.createConnection({
    host: "peliculasweb-mispeliculas.d.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_xaxugtjVSat2SoGiYKp",
    database: "tienda",
    port: 26756
});


// avisar si hay error
conexion.connect(
    function (err) {
        if (err)
            console.log(err.message);
        else
            console.log("Conectado a MySQL!");
    }
);


// 3. ESCRIBIR UN POST PARA CADA REQUERIMIENTO

// responder a la petición /articulosdelrubro que muestra artículos del RUBRO RECIBIDO COMO PARAMETRO
servidor.post("/articulosdelrubro",
    function (req, respuesta) {
        // el parámetro rubro está en el body
        let rubro = req.body.rubro;

        // escribir un query con lo que queremos como respuesta
        const sql = "SELECT * FROM articulos where rubro=?";

        // ejecutar el querysin parámetros
        conexion.query(sql, [rubro],
            function (err, lista) {
                if (err)
                    respuesta.send(err.message);
                else
                    respuesta.send(lista);
            }
        );
    }
)
