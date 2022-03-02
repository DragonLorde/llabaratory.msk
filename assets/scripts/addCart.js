function cartEvent() {
    const buttonCart = document.querySelector('#addButton')
    buttonCart.addEventListener('click' , (e) => {
        let productInfo = JSON.parse(buttonCart.dataset.obj)
        cartList = JSON.parse(localStorage.getItem('cartList'))
        if(cartList.length > 10 || checkCart(cartList, productInfo.id)) {
            return false
        }
        cartList.push( productInfo )
        localStorage.setItem('cartList' , JSON.stringify( cartList ))
        cartMenu()
        checkButtonCart()
    })
}

function checkCart(arr ,id) {

    for (let index = 0; index < arr.length; index++) {
        return arr[index].id == id
    }
}


