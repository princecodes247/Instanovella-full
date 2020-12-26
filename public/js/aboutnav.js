let aboutSect = document.querySelector('#about-sect')
let aboutNav = aboutSect.querySelector('.navi')
let aboutIsOpen = true
let options = aboutNav.querySelectorAll('input')

options.forEach(option => {
    option.addEventListener('click', () => {

        if (aboutSect.querySelector(`#messages-btn`).checked) {
            aboutSect.querySelector(`#about-cont`).classList.add('hidden')
            aboutSect.querySelector(`#messages-cont`).classList.remove('hidden')
        } else if (aboutSect.querySelector(`#about-btn`).checked) {
            aboutSect.querySelector(`#about-cont`).classList.remove('hidden')
            aboutSect.querySelector(`#messages-cont`).classList.add('hidden')
        }
    })
})

