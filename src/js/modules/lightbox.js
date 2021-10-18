/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images de la lightbox
 * @property {string} url Image actuellement affichée
 **/
export default class Lightbox {
  constructor (htmlSelector, medias) {
    this.medias = medias
    this.container = document.querySelector(htmlSelector)
    // servira à identifier l'index du media actuellement sélectionné
    this.currentIndex = -1

    this.buildDOM(this.container)
  }

  close () {
    console.log('close')
  }

  next () {
    console.log('next')
  }

  prev () {
    console.log('prev')
  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    } else if (e.key === 'ArrowLeft') {
      this.prev(e)
    } else if (e.key === 'ArrowRight') {
      this.next(e)
    }
  }

  buildDOM (parent) {
    const dom = document.getElementById('lightbox')
    dom.innerHTML = `
      <button class="lightbox__close">Fermer</button>
      <button class="lightbox__next">Suivant</button>
      <button class="lightbox__prev">Précédent</button>
      <ul class="lightbox__container"></ul>
      `
    dom.querySelector('.lightbox__close').addEventListener('click', this.close)
    dom.querySelector('.lightbox__next').addEventListener('click', this.next)
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev)
    return dom
  }
}