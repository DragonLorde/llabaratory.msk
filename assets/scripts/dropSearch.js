let dropSearch = document.querySelector('.dropSearch')
let headerDropSearch = document.querySelector('.header__srch')
let colDropSearch =  dropSearch.querySelector('.dropSearch__col')
let serachMask = document.querySelector('.serachMask')

serachMask.addEventListener('input' , (e) => {
    let word = e.target.value
    if(0 != word.trim().length) {
        fetch(`http://labaratory.msk/api/v1.0/DeropSearch/${word}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.items.lenght != 0) {
                dropSearch.classList.remove('dropSearch__hide')
                headerDropSearch.classList.add('header__srch__drop')
                colDropSearch.innerHTML = ' '
                data.items.forEach(element => {
                    colDropSearch.insertAdjacentHTML('beforeend' , `
                    <div class="dropSearch__row">
                        <a href="item.html?id=${element.id}">
                            <p>${element.title}</p>
                            <p>${element.price}p.</p>
                        </a>
                    </div>
                    `)
                });
            }
        })
    } else {
        colDropSearch.innerHTML = ' '
        headerDropSearch.classList.remove('header__srch__drop')
    }
})

let headerFormSearch = document.querySelector('.header__srch')
headerDropSearch.addEventListener('submit' , (e) => {
    e.preventDefault()
    let word = serachMask.value
    if(0 != word.trim().length) {
        window.location = `search.html?word=${word}`
    }
})
