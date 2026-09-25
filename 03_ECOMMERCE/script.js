document.addEventListener("DOMContentLoaded", ()=>{
    const products = [
        { id:1, name: "product 1", price: 29.9},
        { id:2, name: "product 2", price: 19.9},
        { id:3, name: "product 3", price: 59.9},
    ];

    const cart = [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay= document.getElementById("total-price");
    const checkOutBtn= document.getElementById("checkout-btn");

    products.forEach((products) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("products");
        productDiv.innerHTML = `
        <span class="m-1">${products.name} - $${products.price.toFixed(2)}</span>
        <button data-id="${products.id}" class="bg-blue-500 rounded-lg border border-gray-900 hover:bg-blue-700 m-1 px-1 shadow hover:border-2">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    })

    productList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        };

    })

    function addToCart(product){
        cart.push(product);
        renderCart();
    }

    function renderCart(){
        cartItems.innerText = "";
        let totalPrice = 0;

        if(cart.length >0){
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `;
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
            });
        } else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$0.00`;
        }
    }
    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert("checkout successfully");
        renderCart();
    })
})