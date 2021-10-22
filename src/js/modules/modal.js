export default class Modal {
  static init () {
    const modalBtn = document.querySelectorAll('#cta-contact')
  }

  constructor () {

  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    }
  }

  close (e) {
    e.preventDefault()
    this.element.classList.add('fadeOut')
    window.setTimeout(() => {
      this.element.remove()
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  buildDom () {
    const dom = document.createElement('div')
    dom.classList.add('modal__container ')
    dom.innerHTML = `
    <button class="modal__close">Fermer</button>
    <button class="modal__submit">Envoyer</button>
    <div class="modal__view">
      <div class="modal__body">
        <form name="contact-form" action="index.html" method="POST" id="contact-form">
          <div class="form-item">
            <label class="item-label" for="firstName">Prénom<abbr title="Champ obligatoire"> *</abbr></label><br>                
            <input class="text__control" type="text" id="firstName" name="firstName" /><br>
            <p class="error__field" id="firstNameErrorField"></p>
          </div>
          <div class="form-item">
            <label class="item-label" for="lastName">Nom<abbr title="Champ obligatoire"> *</abbr></label><br>
            <input class="text__control" type="text" id="lastName" name="lastName"/><br>
            <p class="error__field" id="lastNameErrorField"></p>
          </div>
          <div class="form-item">
            <label class="item-label" for="email">E-mail<abbr title="Champ obligatoire"> *</abbr></label><br>
            <input class="text__control" type="email" id="email" name="email"/><br>
            <p class="error__field" id="emailErrorField"></p>
          </div>
          <div class="form-item">
            <label class="item-label" for="message">Votre message<abbr title="Champ obligatoire"> *</abbr></label><br>
            <textarea name="message" id="message"></textarea>
            <p class="error__field" id="emailErrorField"></p>
          </div>
        </form>
      </div>
    </div>
    `
    dom.querySelector('.modal__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.modal__submit').addEventListener('click', this.next.bind(this))
    return dom
  }
}