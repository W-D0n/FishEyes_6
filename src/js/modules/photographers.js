import { getData, createPhotographer, createGallery, createFilter, sortMedias } from './functions.js'
// eslint-disable-next-line no-unused-vars
import Lightbox from './lightbox.js'

// Une fois les médias triés avec le bouton de sélection
// const sortedMediaList = []
export async function getMediaList () {
  const apiUrl = '/src/assets/data/FishEyeData.json'
  const data = await getData(apiUrl)

  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  const mediaList = []
  const main = document.getElementById('main-content')

  const { photographers, medias } = data
  photographers.forEach(photographer => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographer

    if (id === urlId) {
      createPhotographer(name, id, city, country, tags, tagline, price, portrait)
    }
  })
  const filterContainer = document.createElement('div')
  main.appendChild(filterContainer)
  filterContainer.setAttribute('class', 'nav-select')
  createFilter(filterContainer)

  const galleryContainer = document.createElement('ul')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')

  // Fill mediaList array with media of url ID photographer
  medias.forEach(element => {
    if (element.photographerId === urlId) {
      // createGallery(element)
      mediaList.push(element)
    }
  })

  // Sorted medias
  const sortBtn = document.querySelectorAll('.select-list')
  const selected = document.querySelector('.select-list')
  sortBtn.forEach(btn => btn.addEventListener('change', e => {
    e.preventDefault()
    // console.log('Medias : ', medias)
    sortMedias(selected.value, mediaList)
    // return sortMedias(selected.value, medias)
    // console.log(selected.value)
  }))
  console.log(mediaList)
  return mediaList
}
// select_expandLabel