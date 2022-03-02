let cartList = localStorage.getItem('cartList')

if(cartList != null) {
    if(JSON.parse(cartList).length > 0) {
        getCartItems()
    }
}

function getCartItems() {
    let cartList = localStorage.getItem('cartList')
    let col = document.querySelector('.list__column')
    let cartArr = JSON.parse(cartList)
    col.innerHTML = ' '
    cartArr.forEach(element => {
        //console.log(element)
        col.insertAdjacentHTML('beforeend' , `
        <div class="list__item item" data-id="${element.id}">
            <div class="item__container">
                <div class="item__row item-row">
                    <div class="item-row__column item-row-column">
                        <div class="item__img img">
                            <img src="${element.img}" alt="">
                        </div>
                    </div>

                    <div class="item-row__column item-row-column">
                        <div class="item__title">
                            <p>${element.title}</p>
                        </div>

                        <div class="item__calc">
                            <p>${element.price} р. <span class="text_b total__price-cart">x 1</span></p>
                        </div>

                        <div class="item__price">
                            <p class="text_b item__price-total-b" data-local-price="${element.price}">${element.price} р.</p>
                        </div>
                    </div>

                    <div class="item-row__column item-row-column">
                        <div class="item__quantity quantity">
                            <div class="quantity__container">
                                <div class="quantity__minus">
                                    <span class="minus"></span>
                                </div>

                                <div class="quantity__number" data-id-prod="${element.id}">1</div>

                                <div class="quantity__plus">
                                    <span class="plus"></span>
                                    <span class="plus"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `)
    });
    plusProduct()
} 

function plusProduct() {
    itemSum()
    let item = document.querySelectorAll('.list__item')
    item.forEach(element => {
        element.querySelector('.quantity__minus').addEventListener('click' , (e) => {
            let totalPriceCart = element.querySelector('.total__price-cart')
            let sumElem = element.querySelector('.quantity__number')
            let sum = parseInt(sumElem.textContent)
            let totalPriceB = element.querySelector('.item__price-total-b')
            let idData = sumElem.dataset.idProd

            if(sum != 1) {
                sum -= 1
                sumElem.innerHTML = sum
                totalPriceCart.innerHTML = `x ${sum}`
                totalPriceB.innerHTML = parseInt(totalPriceB.dataset.localPrice) * sum + ' Р.'
                itemSum()
            } else {
                deliteProduct(idData)
            }
        })
        element.querySelector('.quantity__plus').addEventListener('click' , (e) => {
            let sumElem = element.querySelector('.quantity__number')
            let totalPriceCart = element.querySelector('.total__price-cart')
            let sum = parseInt(sumElem.textContent)
            let totalPriceB = element.querySelector('.item__price-total-b')

            if(sum < 10) {
                sum += 1
                sumElem.innerHTML = sum
                totalPriceCart.innerHTML = `x ${sum}` 
                totalPriceB.innerHTML = parseInt(totalPriceB.dataset.localPrice) * sum + ' Р.' 
                itemSum()
            }
        })
    })

}


function deliteProduct(id) {
    let cartList = localStorage.getItem('cartList')
    let arr = JSON.parse(cartList)
    let newArr = arr.filter((prop) => {
        return prop.id != id
    })
    localStorage.setItem('cartList' , JSON.stringify(newArr))
    console.log(newArr)
    getCartItems()
}


function itemSum() {
    let totalSum = 0
    let totalPrice = document.querySelectorAll('.item__price-total-b')
    totalPrice.forEach(elm => {
        let total = parseInt(elm.textContent.replace(/[^+\d]/g, ''))
        totalSum += total
    })
    document.querySelector('.total__sum-bold').innerHTML = `Итого: ${totalSum}р.`
   
}

document.querySelector('.button__all-del').addEventListener('click' , deliteAll)

function deliteAll () {
    localStorage.setItem('cartList' , JSON.stringify([]))
    getCartItems()
}