const srch = document.querySelector('.header__srch')
const srchActive = document.querySelector('.header__srch-active img')
const headerBlock = document.querySelector('.header__block')
const form = document.querySelector('.header__srch')

const menu = document.querySelector('h1')
const navMenu = document.querySelector('.nav__hide')
let stateMenu = false
let width = window.screen.width
document.querySelector('.wrapper').addEventListener('click' , (e) => {
    //e.preventDefault()

    if(e.target == srchActive) {
        e.preventDefault()
        srch.classList.remove('header__hide-block')
        headerBlock.classList.add('header__hide-block')
    } else if(form == e.target.parentElement || form == e.target.parentElement.parentElement) {
        console.log('start');
    } else {
        srch.classList.add('header__hide-block')
        headerBlock.classList.remove('header__hide-block')
    }

    if (width < 600) {
            width = window.screen.width
            if(e.target == menu && stateMenu) {
                menu.classList.remove('rotate')
                stateMenu = false
                navMenu.classList.add('nav__hide-block') 
            }
            else if(navMenu == e.target) {
                return false
            } else if(e.target == menu) {
                menu.classList.add('rotate')
                stateMenu = true
                navMenu.classList.remove('nav__hide-block')
            } else {
                menu.classList.remove('rotate')
                stateMenu = false
                navMenu.classList.add('nav__hide-block')
            }
    }
})

