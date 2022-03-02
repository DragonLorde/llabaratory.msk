window.onload = () => GetItem()

let col = document.querySelector('.items__col')

let url = new URL(window.location.href);
let paramValue = url.searchParams.get("word");
if(paramValue == '' || paramValue == undefined) {
    window.location = '/'
}

let lastIndex = 0

function GetItem() {
    fetch(`api/v1.0/Search/${lastIndex}/${paramValue}`)
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