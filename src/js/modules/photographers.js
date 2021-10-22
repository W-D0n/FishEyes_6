import { getData, createPhotographer, createGallery, createFilter } from './functions.js'
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
  filterContainer.setAttribute('class', 'custom-select')
  createFilter(filterContainer)

  const galleryContainer = document.createElement('ul')
  main.appendChild(galleryContainer)
  galleryContainer.setAttribute('class', 'gallery__container')
  galleryContainer.setAttribute('id', 'galleryContainer')

  // Creating gallery with each image/video
  medias.forEach(element => {
    if (element.photographerId === urlId) {
      createGallery(element)
      mediaList.push(element)
    }
  })

  return mediaList
}
// console.log(getMediaList())
// Lightbox.init()
// lightbox = new Lightbox('#lightbox-modal', photographerMedias)
// si besoin de l'id ou du tag : on va utiliser le " ?? "
// fonction filtrer par id ou tag (id, tag) {
// if id = null/undefined {filtrer par  tag}
// else {filtrer par id}
// }