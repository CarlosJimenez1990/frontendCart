// Obtener los elementos necesarios del DOM
const container = document.querySelector(".container");
const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const checkoutBtn = document.querySelector(".checkout-btn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const submitBtn = document.getElementById("submit-btn");

// Función para mostrar el modal
function showModal() {
  modal.classList.remove("hidden");
}

// Función para ocultar el modal
function hideModal() {
  modal.classList.add("hidden");
}

// Agregar un evento de click al botón de cerrar
closeBtn.addEventListener("click", () => {
  // Ocultar el modal
  hideModal();
});

// Inicializar el carrito como vacío
let cartArray = [];

// Función para agregar un producto al carrito
function addToCart(product) {
  // Verificar si el producto ya está en el carrito
  const existingItem = cartArray.find((item) => item.id === product.id);

  if (existingItem) {
    // Si el producto ya está en el carrito, aumentar su cantidad
    existingItem.quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo con una cantidad de 1
    cartArray.push({ ...product, quantity: 1 });
  }

  // Actualizar la lista de productos en el carrito
  updateCartItems();
}

// Función para actualizar la lista de productos en el carrito
function updateCartItems() {
  // Vaciar la lista de productos en el carrito
  cartItems.innerHTML = "";

  // Recorrer el array de productos en el carrito y agregar cada uno a la lista
  cartArray.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      ${item.nombre} x ${item.quantity}
      <button class="remove-btn" data-id="${item.id}">Remove</button>
      <span>$${item.precio * item.quantity}</span>
    `;
    cartItems.appendChild(li);
  });

  // Actualizar el total del carrito
  const total = cartArray.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );
  cartTotal.textContent = `Total: $${total}`;
}

// Función para mostrar u ocultar el carrito
function toggleCart() {
  cart.classList.toggle("open");
}

// Función para eliminar un producto del carrito
function removeItem(id) {
  // Encontrar el producto correspondiente en el array de productos del carrito
  const index = cartArray.findIndex((item) => item.id === id);

  if (index !== -1) {
    // Si se encontró el producto, eliminarlo del array
    cartArray.splice(index, 1);

    // Actualizar la lista de productos en el carrito
    updateCartItems();
  }
}

// Función para cargar los productos desde el servidor
async function loadProducts() {
  try {
    const response = await fetch("http://localhost:8000/api/productos");
    const data = await response.json();

    // Recorrer los productos y agregarlos al contenedor
    data.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("item");
      div.innerHTML = `
          <img src="${product.imagen}" alt="${product.nombre}">
          <div class="info-product">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>Precio: $${product.precio}</p>
            <button class="btn-add-cart" 
                    data-id="${product.id}" 
                    data-nombre="${product.nombre}" 
                    data-imagen="${product.imagen}" 
                    data-precio="${product.precio}">
              Agregar al carrito
            </button>
          </div>
        `;
      container.appendChild(div);
    });

    // Agregar un evento de click a los botones "Agregar al carrito"
    const addButtons = document.querySelectorAll(".btn-add-cart");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const nombre = button.dataset.nombre;
        const imagen = button.dataset.imagen;
        const precio = parseFloat(button.dataset.precio);

        const product = { id, nombre, imagen, precio };
        addToCart(product);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// Cargar los productos al cargar la página
loadProducts();

checkoutBtn.addEventListener("click", () => {
    // Mostrar el modal
    showModal();
  });
  // Agregar un evento de click al botón de enviar
    submitBtn.addEventListener("click", () => {
    // Obtener los valores de los campos de formulario
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const direccion = document.querySelector("#direccion").value;
    const telefono = document.querySelector("#telefono").value;
    const email = document.querySelector("#email").value;
  
    // Enviar la información del carrito y los datos personales al servidor
    checkout(nombre, apellido, direccion, telefono, email);
    alert("Gracias por su compra!");
  
    // Vaciar el carrito
    cartArray = [];
    updateCartItems();
  
    // Ocultar el modal después de enviar el formulario
    hideModal();
  });

// Agregar un evento de click a los botones "Remove" de la lista de productos en el carrito
cartItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const id = event.target.dataset.id;
    removeItem(id);
  }
});

function addToCart(product) {
  // Buscar si el producto ya está en el carrito
  const existingItem = cartArray.find((item) => item.id === product.id);

  if (existingItem) {
    // Si el producto ya está en el carrito, aumentar su cantidad
    existingItem.quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo con cantidad 1
    cartArray.push({ ...product, quantity: 1 });
  }

  // Actualizar la lista de productos en el carrito
  updateCartItems();

  // Mostrar el carrito si está oculto
  cart.classList.add("open");
}

// Agregar un evento de click al botón de mostrar/ocultar el carrito
cart.addEventListener("click", toggleCart);

// Función para enviar la información del carrito y los datos personales al servidor
async function checkout(nombre, apellido, direccion, telefono, email) {
  try {
    // Crear un array con los productos en el carrito en el formato esperado por el servidor
    const products = cartArray.map((item) => ({
      producto_id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.quantity,
    }));

    // Crear un objeto con los datos personales en el formato esperado por el servidor
    const customer = { nombre, apellido, direccion, telefono, email };

    // Enviar la información al servidor
    const response = await fetch("http://localhost:8000/api/ordenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, customer }),
    });

    if (response.ok) {
      // Si la respuesta del servidor es exitosa, mostrar un mensaje de confirmación y vaciar el carrito
      alert("Gracias por su compra!");
      cartArray = [];
      updateCartItems();
    } else {
      // Si la respuesta del servidor no es exitosa, mostrar un mensaje de error
      const error = await response.json();
      alert(`Error al procesar la orden: ${error.message}`);
    }
  } catch (error) {
    console.error(error);
  }
}
