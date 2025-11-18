


let cart = JSON.parse(localStorage.getItem("cart")) || []; // if cart key found assign it to cart else asign null
let total_price = 0;

// asign the templ
const cartItemTemplate = document.querySelector(".cart-item");
const cartContainer = cartItemTemplate.parentElement;


cartItemTemplate.remove();


if (cart.length === 0) {
    const emptyMessage = document.createElement('h2');
    emptyMessage.textContent = 'Your cart is empty.';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.marginTop = '50px';
    cartContainer.appendChild(emptyMessage);
} else {
    // Loop through the cart array and display each item
    cart.forEach((item, index) => {
        // Clone the template item
        const newCartItem = cartItemTemplate.cloneNode(true);

        // Populate the cloned item's details
        newCartItem.querySelector('#product-image').src = item.image_link;
        newCartItem.querySelector('#image-name').textContent = item.item_name;
        newCartItem.querySelector('#material-type').textContent = item.item_material.charAt(0).toUpperCase() + item.item_material.slice(1); // Capitalize first letter
        newCartItem.querySelector('#size-type').textContent = item.item_size;
        newCartItem.querySelector('#product-price').textContent = item.price;

        let numericPrice = parseFloat(item.price.replace("$", "").trim());
        total_price += numericPrice;

        // Add the remove functionality
        const removeButton = newCartItem.querySelector('.remove-cart');
        removeButton.addEventListener('click', () => {
            removeItemFromCart(index, newCartItem);
        });

        // Append the new item to the cart container
        cartContainer.appendChild(newCartItem);
    });

    document.getElementById("amount").innerText = total_price.toFixed(2);
}



function removeItemFromCart(index, itemElement) {

    let removedPrice = parseFloat(cart[index].price.replace("$", "").trim());


    // Update the running total
    total_price -= removedPrice;

    // Remove the item from the local array
    cart.splice(index, 1);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    itemElement.remove();


    if (cart.length === 0) {
        const emptyMessage = document.createElement('h2');
        emptyMessage.textContent = 'Your cart is empty. Start shopping!';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.marginTop = '50px';
        cartContainer.appendChild(emptyMessage);
    }



    document.getElementById("amount").innerText = total_price.toFixed(2);
    alert("Item removed from cart.");
}