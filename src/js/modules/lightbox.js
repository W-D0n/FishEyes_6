import { getMediaList } from './photographers.js'

getMediaList().then(mediaList => { Lightbox.init(mediaList) })

/**
 * @property {HTMLElement} element
 * @property {string[]} images lightbox's images path
 * @property {string} url currently displayed content
 */
export default class Lightbox {
  static init (mediaList) {
    const links = Array.from(document.getElementsByClassName('media__content'))
    const gallery = links.map(link => link.getAttribute('src'))

    links.forEach(link => link.addEventListener('click', e => {
      e.preventDefault()
      // eslint-disable-next-line no-new
      new Lightbox(e.currentTarget.getAttribute('src'), gallery, mediaList)
    }))
  }

  /**
   * @param {string} url content's URL
   * @param {string} gallery array of src
   * @param {string[]} images lightbox's images path
   */
  constructor (src, srcList, mediaData) {
    this.data = mediaData
    this.srcList = srcList
    this.src = src
    this.element = this.buildDom(src)
    this.currentIndex = srcList.indexOf(src)
    document.body.appendChild(this.element)

    this.render(src)

    this.onKeyUp = this.onKeyUp.bind(this)
    document.addEventListener('keyup', this.onKeyUp)
  }

  getTitle (src) {
    const currentSrc = src.split('/').pop()
    const currentObj = this.data.find(el => el.content === currentSrc)
    const title = currentObj.title
    return title
  }

  getAlt (src) {
    const currentSrc = src.split('/').pop()
    const currentObj = this.data.find(el => el.content === currentSrc)
    const alt = currentObj.alt
    return alt
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
    if (this.currentIndex === this.srcList.length) {
      this.currentIndex = 0
    }
    this.render(this.srcList[this.currentIndex])
  }
  prev (e) {
    e.preventDefault()
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.srcList.length - 1
    }
    this.render(this.srcList[this.currentIndex])
  }

  /**
   *
   * @param {string} url
   * @returns {HTMLElement} dom
   */
  buildDom (src) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close" aria-label="Close lightbox">Fermer</button>
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
    this.title = this.getTitle(src)
    this.alt = this.getAlt(src)

    const container = document.getElementById('lightbox')
    container.innerHTML = ''
    if (this.extension === 'mp4') {
      let video = new Vid(src, container, this.title, this.alt)
    } else {
      let image = new Img(src, container, this.title, this.alt)
    }
  }
}

class Vid {
  constructor(src, container, title, alt) {
    container.insertAdjacentHTML('afterbegin', `
    <video class="lightbox__content" alt="${alt}" autoplay controls loop muted>
      <source src="${src}" type="video/mp4">
    </video>
    <p class="lightbox-content__legend">${title}</p>
    `)
  }
}
class Img {
  constructor(src, container, title, alt) {
    container.insertAdjacentHTML('afterbegin',
        `<figure> 
          <img class="lightbox__content" alt="${alt}" src="${src}"></img>
          <figcaption class="lightbox-content__legend">${title}</figcaption>
        </figure>
        `)
  }
}