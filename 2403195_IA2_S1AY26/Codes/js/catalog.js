



// Attach click event to all items
document.querySelectorAll('.item img').forEach(img =>
    {
        img.addEventListener('click', () =>
            {
                const image =
                {
                    link: img.src,
                    name: img.dataset.name,
                }





            // Save the clicked image source to localStorage
                localStorage.setItem('selectedImage', JSON.stringify(image));

            // Redirect to product page
                window.location.href = 'product.html';
            });
    });

