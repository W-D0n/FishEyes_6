import {} from './variables.js'
import { removeForm } from './modal.js'

const modalBg = document.querySelector('.modal__container ')
const modalDisplay = document.querySelector('.modal__view')
const modalBtn = document.getElementsByClassName('cta-contact')
const closeBtn = document.querySelector('.close__btn')
const closemodal = document.querySelector('.close-form')
const form = document.getElementById('registration-form')
const successDisplay = document.getElementById('success__wrapper')

function closeModal () {
  modalBg.classList.remove('is-open')
  modalBg.classList.toggle('is-close')

  removeForm(form)
}

// Open modal event
modalBtn.forEach((btn) => btn.addEventListener('click', function launchModal () {
  form.reset()
  form.classList.remove('visuallyhidden', 'hidden')
  successDisplay.classList.add('hidden')
  modalBg.classList.remove('is-close')
  modalBg.classList.toggle('is-open')
  form.reset()
}))
// Close modal events
closeBtn.onclick = closeModal
closemodal.onclick = closeModal

// Close modal when clicking outside modal
modalDisplay.onclick = (e) => e.stopPropagation()
modalBg.onclick = closeModal