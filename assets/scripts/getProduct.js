let url = new URL(window.location.href);
let paramValue = url.searchParams.get("id");

if(paramValue == '' || paramValue == undefined) {
    window.location = '/'
}


let imgProduct = document.querySelector('.prod__img')
let info = document.querySelector('.prod__info')
let dicript = document.querySelector('.prod__discirpt')

fetch(`api/v1.0/Product/${paramValue}`)
.then( resp => resp.json() )
.then( prop => {
    console.log(prop)
    imgProduct.style.background = `url(${prop.img})`
    info.insertAdjacentHTML('beforeend' , `
        <h1>${prop.title}</h1>
        <p class="price">${prop.price} p.</p>

        <button id="addButton" data-obj='${JSON.stringify(prop)}'>Добавить в корзину</button>
    `)
    dicript.insertAdjacentHTML('beforeend' , `
        <li>${prop.description}</li>
    `)
    cartEvent()
    checkButtonCart()
} )
