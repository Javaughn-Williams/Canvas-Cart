const selectedImage = localStorage.getItem('selectedImage');

let img_element = document.getElementById('product-image');
let img_name = document.getElementById('image-name');
let img_h_ratio;

if (selectedImage)
    {
        const image = JSON.parse(selectedImage);

        img_element.src = image.link;
        img_name.innerText = image.name;

        const img_height = img_element.naturalHeight;
        const img_width = img_element.naturalWidth;

        img_h_ratio = img_height / img_width;

        let size_string = "Small (" + Math.round(img_h_ratio * 10) + "× 10) in";
        document.getElementById("sml-img").innerText = size_string;

        size_string = "Medium (" + Math.round(img_h_ratio * 12) + "× 12) in";
        document.getElementById("med-img").innerText = size_string;

        size_string = "Large (" + Math.round(img_h_ratio * 16) + "× 16) in";
        document.getElementById("lrg-img").innerText = size_string;
    }


const material_radios = document.querySelectorAll('input[name="material"]');
const size_radios = document.querySelectorAll('input[name="size"]');
let material_cost = 100;
let canvas_size = 10;

material_radios.forEach(radio =>
{
    radio.addEventListener('change', function()
    {
        const material = this.value;

        
        if (material == "paper")
        {
            material_cost = 50;
        }
        else if (material == "metal")
        {
            material_cost = 100;
        } else
        {
            material_cost = 70;
        }

        update_price();
    });
});


size_radios.forEach(radio =>
{
    radio.addEventListener('change', function()
    {
        const size = this.value;

        
        if (size == "small")
        {
            canvas_size = 10;
        }
        else if (size == "medium")
        {
            canvas_size = 12;
        } else
        {
            canvas_size = 18;
        }

        update_price();
    });
});

function update_price()
{
    let price = "$ " + material_cost * Math.round(img_h_ratio * canvas_size);
    document.getElementById("product-price").innerText = price;
}
