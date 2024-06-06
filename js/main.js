let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let catalogo = [
    { nombre: "Laptop Gamer ASUS", precio: 1500, categoria: "laptops" },
    { nombre: "Laptop Gamer MSI", precio: 1800, categoria: "laptops" },
    { nombre: "Laptop Gamer Acer", precio: 1400, categoria: "laptops" }
];

    document.getElementById("verCatalogoBtn").addEventListener("click", () => {
    document.getElementById("catalogoDiv").classList.toggle("hidden");
});
    document.getElementById("comprarProductoBtn").addEventListener("click", () => {
    document.getElementById("comprarDiv").classList.toggle("hidden");
});
    document.getElementById("verCarritoBtn").addEventListener("click", verCarrito);
    document.getElementById("filtrarBtn").addEventListener("click", mostrarCatalogo);
    document.getElementById("comprarBtn").addEventListener("click", comprarProducto);
    document.getElementById("vaciarCarritoBtn").addEventListener("click", vaciarCarrito);

function mostrarCatalogo() {
    let categoriaSeleccionada = document.getElementById("categoriaSelect").value;
    let productosFiltrados = catalogo.filter(producto => producto.categoria === categoriaSeleccionada);

    let productosDiv = document.getElementById("productosCatalogo");
    productosDiv.innerHTML = ""; 

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(producto => {
            let p = document.createElement("p");
            p.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
            productosDiv.appendChild(p);
        });
    } else {
        let p = document.createElement("p");
        p.textContent = "No hay productos disponibles en esta categoría.";
        productosDiv.appendChild(p);
    }
}

function comprarProducto() {
    let productoSeleccionado = parseInt(document.getElementById("productoSelect").value);
    if (!isNaN(productoSeleccionado) && productoSeleccionado >= 1 && productoSeleccionado <= catalogo.length) {
        let productoAComprar = catalogo[productoSeleccionado - 1];
        carrito.push(productoAComprar);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarEnDOM(`Usted ha comprado ${productoAComprar.nombre}.`);
    } else {
        mostrarEnDOM("Número de producto no válido. Por favor, ingrese un número válido.");
    }
}

function verCarrito() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; 
    if (carrito.length > 0) {
        mostrarEnDOM("Productos en el carrito:");
        carrito.forEach(producto => {
            mostrarEnDOM(`${producto.nombre} - Precio: $${producto.precio}`);
        });
    } else {
        mostrarEnDOM("Ups, no hay nada en el carrito. ¡Compre productos!");
    }
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarEnDOM("El carrito ha sido vaciado.");
}

function mostrarEnDOM(mensaje) {
    let outputDiv = document.getElementById("output");
    let p = document.createElement("p");
    p.textContent = mensaje;
    outputDiv.appendChild(p);
}
