import { fnGetData, fnCreatePhotographer, fnCreateGallery, fnCreateFilter } from './functions.js'

import Lightbox from './lightbox.js'

const apiUrl = '/src/assets/data/FishEyeData.json'
const mediaList = []
let lightbox = null

fnGetData(apiUrl).then((data) => {
  // 1 : Create photographer's card
  // mediaList = data.media
  // Getting id from URL
  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  // Getting html context
  const main = document.getElementById('main-content')

  // Creating photographers profil
  const { photographers, media } = data
  photographers.forEach(photographers => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographers

    if (id === urlId) {
      fnCreatePhotographer(name, id, city, country, tags, tagline, price, portrait)
    }
  })
  // 2 : Create filter
  // Creating html context for the gallery
  const filterContainer = document.createElement('div')
  main.appendChild(filterContainer)
  filterContainer.setAttribute('class', 'custom-select')
  fnCreateFilter(filterContainer)

  // 3 : Create gallery

  // Creating html context for the gallery
  const galleryContainer = document.createElement('div')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')

  // Creating gallery with each image/video
  media.forEach(media => {
    const { mediaId, photographerId, title, content, tags, likes, date, price } = media
    if (photographerId === urlId) {
      // console.log('Image: ' + content)
      fnCreateGallery(mediaId, photographerId, title, content, tags, likes, date, price)
      mediaList.push(media)
    }
  })
  // console.log(mediaUrlList)
  // const target = document.querySelector('#galleryContainer > div:nth-child(3) > a > img')

  const selector = document.querySelectorAll('.media__content')

  // console.log(mediaList)
  // console.log(selector)
  //  '.media__content'
  getHtmlElements(mediaList, selector)
})

// console.log(mediaList)
// Getting nodelist of media and launch lightbox
function getHtmlElements (media, arr) {
  // console.log(arr)
  for (const target of arr) {
    target.addEventListener('click', e => {
      e.preventDefault()
      // console.log(e.target.src)
      lightbox = new Lightbox('#lightbox', mediaList)
    })
  }
}
// Lightbox.init()
// lightbox = new Lightbox('#lightbox-modal', photographerMedias)
// si besoin de l'id ou du tag : on va utiliser le " ?? "
// fonction filtrer par id ou tag (id, tag) {
// if id = null/undefined {filtrer par  tag}
// else {filtrer par id}
// }