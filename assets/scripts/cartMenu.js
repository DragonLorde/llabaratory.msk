let cartList = localStorage.getItem('cartList')
let cartElm = document.querySelector('.cart')//cart__acitve
if(cartList != null) {
    if(JSON.parse(cartList).length > 0) {
        cartMenu()
    }
} else {
    localStorage.setItem( 'cartList' , JSON.stringify([]) )
}


function cartMenu() {
    let cartArr = localStorage.getItem('cartList')
    let priceCount = itemSum(JSON.parse( cartArr ))

    cartElm.classList.add('cart__acitve')
    cartElm.innerHTML = ' '
    cartElm.insertAdjacentHTML('beforeend' , `
        <p>${priceCount} Р.</p>
        <img src="assets/img/icons/cart-black.png" alt="">
    `)
}

function itemSum(obj) {
    let sum = 0
    obj.forEach(element => {
       sum += parseInt(element.price) 
    });
    return sum
}