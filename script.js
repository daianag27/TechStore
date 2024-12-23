document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.querySelector("#productos-container");
    const limit = 15; 

    async function fetchProductos() {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
            if (!response.ok) throw new Error('Error fetching products');
            const data = await response.json();
            renderProductos(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function renderProductos(productos) {
        productosContainer.innerHTML = "";
        productos.forEach(product => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";

            cardDiv.innerHTML = `
                <div class="card mt-3">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text fw-bold">Precio: $${product.price}</p>
                        <div class="d-flex justify-content-between mt-auto">
                            <button class="btn btn-primary">Ver más</button>
                            <button class="btn btn-success">Agregar</button>
                        </div>
                    </div>
                </div>
            `;

            const botonVerMas = cardDiv.querySelector(".btn-primary");
            const botonAgregar = cardDiv.querySelector(".btn-success");

            botonVerMas.addEventListener("click", () => {
                mostrarModal(product);
            });

            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(product);
            });

            productosContainer.appendChild(cardDiv);
        });
    }

    function mostrarModal(product) {
        const modal = document.getElementById('productModal');
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        modalImg.src = product.thumbnail;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        
        modal.style.display = 'block';
    }

    function ocultarModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    function agregarAlCarrito(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.title} ha sido agregado al carrito!`);
    }

    document.querySelector('.close').addEventListener('click', ocultarModal);
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('productModal')) {
            ocultarModal();
        }
    });

    
    fetchProductos();
});