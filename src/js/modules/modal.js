export default class Modal {
  static init () {
    const modalBtn = document.querySelectorAll('.signup')
    document.body.insertAdjacentHTML('beforeend', `
          <div class="lightbox" id="lightbox" style="display: none;">
              <div class="lightbox__inner">
                  <button type="button" class="lightbox__close">
                      &times;
                  </button>
                  <ul class="lightbox__content"></ul>
              </div>
          </div>
      `)
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
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container" id="lightbox"></div>`
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
    return dom
  }
}