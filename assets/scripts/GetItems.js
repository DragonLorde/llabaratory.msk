window.onload = () => GetItem()

const navCategory = document.querySelectorAll('.nav__row');
const navCategoryMobile = document.querySelectorAll('.data-mobile');

let categoryID = 0
let lastIndex = 0
let col = document.querySelector('.items__col')
navCategoryMobile.forEach(element => {
    element.addEventListener('click' , (event) => {
        event.preventDefault()
        lastIndex = 0
        categoryID = element.dataset.productId
        col.innerHTML = ' '
        GetItem()
    })
});


navCategory.forEach(element => {
    element.addEventListener('click' , (event) => {
        lastIndex = 0
        categoryID = element.dataset.productId
        col.innerHTML = ' '
        GetItem()
    })
});



function GetItem() {
    fetch(`api/v1.0/Items/${lastIndex}/${categoryID}/`)
    .then( (prop) => prop.json() )
    .then( (obj) => CreateElements(obj) )
}

function CreateElements(obj) {
    if(obj.items.length == 0) {
        window.removeEventListener('scroll', scrollFunc)
    } else {
        window.addEventListener('scroll' , scrollFunc)
    }
    lastIndex = obj.lastIndex
    obj.items.forEach(element => {
        col.insertAdjacentHTML('beforeend' , `
        <div class="items__row">
            <a class="items__row-block" href='item.html?id=${element.id}'>
                <img src="${element.img}" alt="">
                <p>${element.title}</p>
                <p>${element.price} Р.</p>
            </a>
        </div>
        `)
    });
}


function scrollFunc() {
    if((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        GetItem()
    }
}