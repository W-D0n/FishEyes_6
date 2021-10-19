import { getMediaList } from './photographers.js'

const mediaList = getMediaList()
/**
   * @property {HTMLElement} element
   * @property {string[]} images lightbox's images path
   * @property {string} url currently displayed image
   */
export default class Lightbox {
  static init () {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]'))
    const gallery = links.map(link => link.getAttribute('href'))
    links.forEach(link => link.addEventListener('click', e => {
      e.preventDefault()
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute('href'), gallery)
    }))
  }

  /**
   * @param {string} url image's URL
   * @param {string[]} images lightbox's images path
   */
  constructor (url, images) {
    this.element = this.buildDom(url)
    this.images = images
    this.loadImage(url)
    this.onKeyUp = this.onKeyUp.bind(this)
    // document.body.insertAdjacentHTML('beforeend', element)
    document.body.appendChild(this.element)
    document.addEventListener('keyup', this.onKeyUp)
  }

  /**
   *  Display loader and load image
   * @param {string} url
   */
  loadImage (url) {
    this.url = null
    const image = new Image()
    const container = this.element.querySelector('.lightbox__container')
    const loader = document.createElement('div')
    loader.classList.add('lightbox__loader')
    container.appendChild(loader)
    image.onload = () => {
      container.removeChild(loader)
      container.appendChild(image)
      this.url = url
    }
    image.src = url
  }

  /**
   * Keyboard integration
   * @param {KeyboardEvent} e
   */
  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close(e)
    }
    if (e.key === 'ArrowLeft') {
      this.prev(e)
    }
    if (e.key === 'ArrowRight') {
      this.next(e)
    }
  }

  /**
   * Close lightbox with a fade effect after waiting 500ms
   * @param {MouseEvent|KeyboardEvent} e
   */
  close (e) {
    e.preventDefault()
    this.element.classList.add('fadeOut')
    window.setTimeout(() => {
      this.element.remove()
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  /**
   * Next image
   * @param {MouseEvent|KeyboardEvent} e
   */
  next (e) {
    e.preventDefault()
  }

  /**
   * Previous image
   * @param {MouseEvent|KeyboardEvent} e
   */
  prev (e) {
    e.preventDefault()
  }

  /**
   *
   * @param {string} url
   * @returns {HTMLElement} dom
   */
  buildDom (url) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container"></div>`
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
    return dom
  }
}

Lightbox.init()
// console.log()
console.log(mediaList)