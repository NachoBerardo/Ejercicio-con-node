const { json } = require('express');
const express = require('express'); //llamamos a express
const app = express();  //guardamos lo que nos devuelve express en app
const port = 9000;  //3000 se suele usar para servers front y 9000 para back
const menu = require('./Menu.json');
app.use(express.json());
//npm run dev



//Ejercicio 1
app.get("/menu", (req, res) => { //cuando se haga un get con la barra hace esta funcion. Este tiene 2 parametros req, que es la request, y res, que es la respuesta la cual vva a estar vacia 
    res.json(menu);
});

//Ejercicio 2
app.get("/menu/:id", (req, res) => { 
    const id = req.params.id;
    const item = menu.find(item => item.id === id);
    if (!item){ 
        return res.status(404).json({ error: "item not found"});
    }
    res,json(item);
});

//Ejercicio 3
app.get("/principales", (req, res) => { 
    res.json(menu.filter(a => a.tipo == "principal")); //use send para probarl
});

//Ejercicio 4
app.get("/postres", (req, res) => { 
    res.json(menu.filter(a => a.tipo == "postre"));
});

//Ejercicio 5
app.get("/bebidas", (req, res) => { 
    res.json(menu.filter(a => a.tipo == "bebida"));
});

//Ejercicio 6
app.post("/pedido", (req, res) => { 
    if(!req.body.productos)
        return res.status(400).send("No se han pedido productos")

    const precio = req.body.productos
        .map(
            (item) => menu.find((i) => i.id === item.id).precio * item.cantidad
        )
        .reduce((a, b) => a+ b);
    
    res.status(200).json({
        message: "Pedido recibido",
        precio: precio,
    });
});

app.listen(port, () => { //despues de cear las rutas prendo el server y corra esta función 
    console.log(` > Server running on port ${port}`);
});