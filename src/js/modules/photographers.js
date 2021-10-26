/* eslint-disable no-unused-vars */
import { getData, createPhotographer, createGallery, createFilter, sortMedias } from './functions.js'
import Lightbox from './lightbox.js'
import Modal from './modal.js'

export async function getMediaList () {
  const apiUrl = '/src/assets/data/FishEyeData.json'
  const data = await getData(apiUrl)

  const params = (new URL(document.location)).searchParams
  const urlId = parseFloat(params.get('id'))
  let currentPhotographer = ''
  let currentPrice = ''
  const mediaList = []
  const main = document.getElementById('main-content')

  const { photographers, medias } = data
  photographers.forEach(photographer => {
    const { name, id, city, country, tags, tagline, price, portrait } = photographer

    if (id === urlId) {
      createPhotographer(name, id, city, country, tags, tagline, price, portrait)
      currentPhotographer = photographer.name
      currentPrice = photographer.price
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

  // Fill mediaList array with photographer's ID media
  medias.forEach(element => {
    if (element.photographerId === urlId) {
      createGallery(element)
      mediaList.push(element)
    }
  })

  // Sorted medias
  const sortBtn = document.querySelectorAll('.select-list')

  // Usefull to use .value param in sortMedias fct
  const selected = document.querySelector('.select-list')
  const ctnr = document.querySelector('.gallery__container')

  sortBtn.forEach(btn => btn.addEventListener('change', e => {
    e.preventDefault()
    ctnr.innerHTML = ''
    // Sort list of media by the input button's selected
    const sortedList = sortMedias(selected.value, mediaList)
    sortedList.forEach(element => {
      createGallery(element)
    })
    Lightbox.init()
  }))

  // Sum of likes for this photographer
  const numberOfLikes = mediaList.reduce((sum, object) => sum + object.likes, 0)
  console.log(numberOfLikes)

  // Create Modal
  console.log(currentPhotographer)
  console.log(currentPrice)
  const contactCta = document.querySelector('#cta-contact')
  // eslint-disable-next-line no-new
  contactCta.addEventListener('click', e => { new Modal(currentPhotographer) })

  return mediaList
}