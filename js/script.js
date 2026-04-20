const modalTrigger = document.querySelector('.trigger')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.close')
modalTrigger.addEventListener('click', () => {
    modal.style.display = 'flex';
})

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
})

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
})
