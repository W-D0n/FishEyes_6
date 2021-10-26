export default class Modal {
  constructor (photographer) {
    this.dom = this.buildDom(photographer)
    // document.body.insertAdjacentHTML('beforeend', this.dom)
    document.body.appendChild(this.dom)
  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    }
  }

  submit (e) {}
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
      <button class="modal__close">Fermer</button>
      <button class="modal__submit cta-btn" id="submitBtn" type="submit">Envoyer</button>
        <div class="modal__body">
          <h3 class="modal__heading">Contactez-moi</h3>
          <h4 class="modal__heading">${name}</h4>
          <form name="contact-form" action="index.html" method="POST" id="contact-form">
            <div class="form-item">
              <label class="item-label" for="firstName">Prénom</label><br>                
              <input class="input__control" type="text" id="firstName" name="firstName" /><br>
              <p class="error__field" id="firstNameErrorField"></p>
            </div>
            <div class="form-item">
              <label class="item-label" for="lastName">Nom</label><br>
              <input class="input__control" type="text" id="lastName" name="lastName"/><br>
              <p class="error__field" id="lastNameErrorField"></p>
            </div>
            <div class="form-item">
              <label class="item-label" for="email">E-mail</label><br>
              <input class="input__control" type="email" id="email" name="email"/><br>
              <p class="error__field" id="emailErrorField"></p>
            </div>
            <div class="form-item">
              <label class="item-label" for="message">Votre message</label><br>
              <textarea class="input__control area" name="message" id="message"></textarea>
              <p class="error__field" id="emailErrorField"></p>
            </div>
          </form>
        </div>
      </div>
      `
    dom.querySelector('.modal__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.modal__submit').addEventListener('click', this.submit.bind(this))
    return dom
  }
}