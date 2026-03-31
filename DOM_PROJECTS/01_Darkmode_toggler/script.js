const switchBtn = document.querySelector('button');
const body = document.querySelector('body');


switchBtn.addEventListener('click', () => {
    if (body.classList.value === 'dark') {
        switchBtn.textContent = 'Switch to Dark mode'
    } else {
        switchBtn.textContent = 'Switch to Light mode'
    }
    body.classList.toggle('dark')
})
