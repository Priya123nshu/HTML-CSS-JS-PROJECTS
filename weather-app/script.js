document.addEventListener('DOMContentLoaded',function()
{
    const product = [
            {id: 1 , name: "Product 1" , price: 23.23},
            {id: 2 , name: "Product 2" , price: 21.23},
            {id: 3 , name: "Product 3" , price: 24.23},
            {id: 4 , name: "Product 4" , price: 28.23}
    ]
    const cart = []
    const produ = document.getElementById("products");
    const item = document.getElementById("cartitem");
    const sitem = document.getElementById("shopping-cart");
    const emp = document.getElementById("empty-cart")
    const cartt = document.getElementById("carttotal")
    const tpri = document.getElementById("price")
    const ckbutton = document.getElementById("check")


    product.forEach(product =>
{
    const prodiv  = document.createElement("div")
    prodiv.classList.add("product")
    prodiv.innerHTML=`
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `
    item.appendChild(prodiv)
})

item.addEventListener("click",(e)=>{
    if(e.target.tagName==="BUTTON")
    {
        const productId = parseInt(e.target.getAttribute("data-id"))
        const duct = product.find(p=> p.id===productId)
        addtocart(duct)
    }
})


function addtocart(duct)
{
    cart.push(duct)
    renderCart(cart)
}


function renderCart(cart) {
    if (cart.length > 0) {
        // Remove the "empty-cart" message if cart is not empty
        var element = document.getElementById('empty-cart');
        if (element) {
            element.remove();
        }

        // Show the cart total container
        cartt.classList.remove("hidden");
        cartt.style.display = "block";

        // Clear the cart container before adding new items (to prevent duplicates)
        sitem.innerHTML = '';

        // Variable to keep track of the total price
        let tpr = 0;

        // Iterate over the cart array and render each item
        cart.forEach((item) => {
            // Update the total price
            tpr += item.price;

            // Create a new div element for each cart item
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;

            // Append the cart item to the cart container
            sitem.appendChild(cartItem);
        });

        // Optionally, display the total price somewhere in the cart
        const priceDisplay = document.getElementById('price');
        if (priceDisplay) {
            priceDisplay.textContent = `$${tpr.toFixed(2)}`;
        }

        console.log('Cart is not empty! Proceed with further actions.');
    } else {
        console.log('Cart is empty.');
    }
}

})
