let scale = document.querySelector('.prod__img-scale')
let img = document.querySelector('.prod__img')
scale.addEventListener('click' , (e) => {
    img.classList.toggle('scale-product')
})