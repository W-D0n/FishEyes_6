import { getExtension } from './functions.js'
import { getMediaList } from './photographers.js'

/**
   * @property {HTMLElement} element
   * @property {string[]} images lightbox's images path
   * @property {string} url currently displayed content
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
   * @param {string} url content's URL
   * @param {string[]} images lightbox's images path
   */
  constructor (url, contents) {
    this.element = this.buildDom(url)
    this.contents = contents
    this.loadContent(url)
    this.onKeyUp = this.onKeyUp.bind(this)
    // document.body.insertAdjacentHTML('beforeend', element)
    document.body.appendChild(this.element)
    document.addEventListener('keyup', this.onKeyUp)
  }

  /**
   *  Display loader and load content
   * @param {string} url
   */
  loadContent (url) {
    this.url = null
    let type = ''

    const fileExtension = url.split('.').pop()
    console.log('fileExtension : ', fileExtension)
    fileExtension === 'jpg' ? type = 'img' : type = 'video'
    console.log('type : ', type)

    const content = document.createElement(`${type}`)
    console.log('content : ', content)
    const container = this.element.querySelector('.lightbox__container')
    // const loader = document.createElement('div')
    // loader.classList.add('lightbox__loader')
    container.innerHTML = ''
    // container.appendChild(loader)
    content.onload = () => {
      // container.removeChild(loader)
      container.appendChild(content)
      this.url = url
    }
    content.src = url
    console.log('url ', url)
    console.log('content src : ', content.src)
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
   * Next
   * @param {MouseEvent|KeyboardEvent} e
   */
  next (e) {
    e.preventDefault()
    let index = this.contents.findIndex(content => content === this.url)
    if (index === this.contents.length - 1) {
      index = -1
    }
    this.loadContent(this.contents[index + 1])
  }

  /**
   * Previous
   * @param {MouseEvent|KeyboardEvent} e
   */
  prev (e) {
    e.preventDefault()
    let index = this.contents.findIndex(content => content === this.url)
    if (index === 0) {
      index = this.contents.length
    }
    this.loadContent(this.contents[index - 1])
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
        <div class="lightbox__container" id="lightbox"></div>`
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))

    // lightbox.addEventListener('mousedown', e => {
    //   console.log('listener ok')
    //   if (e.target.matches('.lightbox__container')) {
    //     console.log('it match')
    //     this.close()
    //   }
    // })
    return dom
  }

  // typeOfContent (url) {
  //   console.log(url)
  //   let type = ''
  //   const fileExtension = this.url.split('.').pop()
  //   fileExtension === 'mp4' ? type = 'video' : type = 'img'
  //   return type
  // }
}

getMediaList().then(mediaList => {
  Lightbox.init()
  // console.log(mediaList)
  // loadingImages(mediaList)
})

// exéc fonction anonyme immédiatement
// permet d'utiliser l'async/await (il faut être dans une fonction pour pouvoir utiliser l'asyncro) : (()=>{})()
// (async () => {
//   const mediaList = await getMediaList()
//   Lightbox.init()
//   console.log(mediaList)
// })()
// console.log()