let dataForm = document.querySelector('.form__fields')
dataForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    let arr = [

    ]
    let prdouctEl = document.querySelectorAll('.quantity__number')
    if(prdouctEl.length == 0) return false
    prdouctEl.forEach(el => {
        arr.push(
            [parseInt(el.dataset.idProd) , parseInt(el.textContent)]
        )
    })
    let data = new FormData(dataForm)
    data.append('arr' , JSON.stringify(arr))
    fetch(`api/v1.0/Cart` , {
        method: 'POST',
        body: data
    })
    .then(resp => resp.json())
    .then(data => {
        localStorage.clear()
        document.querySelector('.list__column').innerHTML = ' '
        let warning = document.querySelector('.warning')
        warning.classList.add('warning__invisible')
        warning.querySelector('.uniq-code').innerHTML = data.order_id
        warning.querySelector('.total-sum-api').innerHTML = `${data.totalPrice} р.`
    })
})