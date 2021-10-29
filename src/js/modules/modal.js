export default class Modal {
  constructor (photographer) {
    this.dom = this.buildDom(photographer)
    // document.body.insertAdjacentHTML('beforeend', this.dom)
    document.body.appendChild(this.dom)

    this.onKeyUp = this.onKeyUp.bind(this)
    document.addEventListener('keyup', this.onKeyUp)
  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    }
  }

  submit (e) {
    e.preventDefault()
  }

  close (e) {
    e.preventDefault()
    this.dom.classList.add('fadeOut')
    window.setTimeout(() => {
      this.dom.remove()
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  buildDom (name) {
    const dom = document.createElement('div')
    dom.classList.add('modal__container')
    dom.innerHTML = `
    <div class="modal__view">
      <button class="modal__close" aria-label="close form button" tabindex="5">
        <img src="/src/assets/icons/modal_close.svg" alt="close icon's" class="closebtn">
      </button>
        <div class="modal__body">
          <h3 class="modal__heading">Contactez-moi</h3>
          <h4 class="modal__heading">${name}</h4>
          <form name="contact-form" action="index.html" method="POST" id="contact-form">
            <div class="form-item">
              <label class="item-label" for="firstName">Prénom</label><br>                
              <input class="input__control" type="text" id="firstName" name="firstName" tabindex="0"/><br>
              <p class="error__field" id="firstNameErrorField"></p>
            </div>
            <div class="form-item">
              <label class="item-label" for="lastName">Nom</label><br>
              <input class="input__control" type="text" id="lastName" name="lastName" tabindex="1"/><br>
              <p class="error__field" id="lastNameErrorField"></p>
            </div>
            <div class="form-item">
              <label class="item-label" for="email">E-mail</label><br>
              <input class="input__control" type="email" id="email" name="email" tabindex="2"/><br>
              <p class="error__field" id="emailErrorField"></p>
            </div>
            <div class="form-item">
              <label class="item-label" for="message">Votre message</label><br>
              <textarea class="input__control area" name="message" id="message" tabindex="3"></textarea>
              <p class="error__field" id="emailErrorField"></p>
            </div>
          </form>
        </div>
        <button class="modal__submit cta-btn" id="submitBtn" aria-label="Submit form" type="submit" tabindex="4">Envoyer</button>
      </div>
      `
    dom.querySelector('.modal__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.modal__submit').addEventListener('click', this.submit.bind(this))
    return dom
  }
}