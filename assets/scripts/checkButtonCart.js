function checkButtonCart() {
    const buttonCart = document.querySelector('#addButton')
    let cartList = JSON.parse(localStorage.getItem('cartList'))
    let productInfo = JSON.parse(buttonCart.dataset.obj)
    if(checkCart(cartList, productInfo.id)) {
        buttonCart.classList.add('cartSide')
        buttonCart.innerHTML = 'В корзине'
    }
}