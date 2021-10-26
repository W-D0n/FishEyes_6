import { getMediaList } from './photographers.js'

getMediaList().then(mediaList => { Lightbox.init() })

/**
 * @property {HTMLElement} element
 * @property {string[]} images lightbox's images path
 * @property {string} url currently displayed content
 */
export default class Lightbox {
  static init () {
    const links = Array.from(document.getElementsByClassName('media__content'))
    const gallery = links.map(link => link.getAttribute('src'))
    links.forEach(link => link.addEventListener('click', e => {
      e.preventDefault()
      const fileExtension = link.src.split('.').pop()
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute('src'), gallery, fileExtension)
    }))
  }

  /**
   * @param {string} url content's URL
   * @param {string[]} images lightbox's images path
   */
  constructor (src, contents, fileExtension) {
    this.medias = contents
    this.element = this.buildDom(src)
    this.currentIndex = contents.indexOf(src)
    this.src = contents
    document.body.appendChild(this.element)
    this.media = this.render(src, this.extension)

    this.onKeyUp = this.onKeyUp.bind(this)
    document.addEventListener('keyup', this.onKeyUp)
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
   * Previous / Next media
   * @param {MouseEvent|KeyboardEvent} e
   */
  next (e) {
    e.preventDefault()
    this.currentIndex++
    if (this.currentIndex === this.medias.length) {
      this.currentIndex = 0
    }
    this.render(this.src[this.currentIndex])
  }

  prev (e) {
    e.preventDefault()
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.medias.length - 1
    }
    this.render(this.src[this.currentIndex])
  }

  /**
   *
   * @param {string} url
   * @returns {HTMLElement} dom
   */
  buildDom (src) {
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

  render (src) {
    this.extension = src.split('.').pop()
    const container = document.getElementById('lightbox')
    container.innerHTML = ''
    if (this.extension === 'mp4') {
      container.insertAdjacentHTML('afterbegin', `<video class="lightbox__content" alt="osef" width="640" height="480"
      autoplay controls loop muted>
        <source src="${src}" type="video/mp4">
        </video>`)
    } else {
      container.insertAdjacentHTML('afterbegin', `<img class="lightbox__content" alt="osef" src="${src}"></img>`)
    }
    // container.appendChild
  }
}
// exéc fonction anonyme immédiatement
// permet d'utiliser l'async/await (il faut être dans une fonction pour pouvoir utiliser l'asyncro) : (()=>{})()
// (async () => {
//   const mediaList = await getMediaList()
//   Lightbox.init()
// })()