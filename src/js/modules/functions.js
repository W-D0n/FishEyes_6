const main = document.getElementById('main-content')

// Setting up of the homepage's grid for cards
const cardGridDiv = document.createElement('div')
cardGridDiv.setAttribute('class', 'card__grid')
cardGridDiv.setAttribute('id', 'cardGrid')
main.appendChild(cardGridDiv)

// request data from API, test response and return data
export const fnGetData = async (url) => {
  try {
    const res = await fetch(url)
    const profilData = res.json()

    return profilData
  } catch (error) {
    console.error(error.status)
  }
}
// Creation of front page's cards presenting photographers
export async function fnCreateHomePage (name, id, city, country, tags, tagline, price, portrait) {
  const profilDiv = document.createElement('a')
  profilDiv.setAttribute('class', 'profil__container link')
  profilDiv.setAttribute('href', `/pages/photographer.html?id=${id}&name=${name}`)
  cardGridDiv.appendChild(profilDiv)

  insertHtml(profilDiv, name, id, city, country, tags, tagline, price, portrait)

  // Adding price field
  const desc = document.getElementById(`desc${id}`)
  const descPrice = document.createElement('p')
  descPrice.setAttribute('class', 'description__price')
  desc.appendChild(descPrice)
  descPrice.innerHTML = `${price}<span>€</span>/jour`

  createTagList(profilDiv, tags)
}
// Creation of photographer's presentation
export async function fnCreateProfil (name, id, city, country, tags, tagline, price, portrait) {
  main.removeChild(cardGridDiv)
  const photographContainer = document.createElement('div')
  photographContainer.setAttribute('class', 'photograph__container')
  main.appendChild(photographContainer)

  insertHtml(photographContainer, name, id, city, country, tags, tagline, price, portrait)
  createTagList(photographContainer, tags)
}
// Creation of photographer's gallery
export async function fnCreateGallery (mediaId, photographerId, title, content, tags, likes, date, price) {
  const galleryContainer = document.getElementById('galleryContainer')
  const mediaContainer = document.createElement('a')
  mediaContainer.setAttribute('class', 'media__container link')
  galleryContainer.appendChild(mediaContainer)

  const label = fnGetExtension(content)

  mediaContainer.innerHTML = `
  <article class="media__container">
    <${label} class="media__content" src="./src/assets/media/${photographerId}/${content}"  alt="" />
    <div class="legend">
      <h4>${title}</h4>
      <button class="legend__likes">
        <span class="likes__counter">${likes}</span>
        <span class="fas fa-heart likes__icon"></span>
      </button>
    </div>
  </article>
  `
}
const insertHtml = (parentHtml, name, id, city, country, tags, tagline, price, portrait) => {
  parentHtml.innerHTML = `
  <div class="profil__img__container">
    <img src="./src/assets/media/Photographers_ID/${portrait}" alt="Photographer's portrait" class="img__profil" />
  </div>
  <h2 class="profil__name">${name}</h2>
  <div class="profil__description" id="desc${id}">
    <h3 class="location">${country}, <span>${city}</span></h3>
    <p class="description__text">${tagline}</p>
  </div>
`
}
const createTagList = (parentHtml, tags) => {
  // Creation of tags list of each photographers
  const newTagList = document.createElement('ul')
  newTagList.setAttribute('class', 'profil__tag-list')
  parentHtml.appendChild(newTagList)

  tags.forEach(tag => {
    const newTagItem = document.createElement('li')
    newTagItem.setAttribute('class', 'tag-item')
    newTagList.appendChild(newTagItem)
    newTagItem.innerHTML = `#${tag}`
  })
}

function fnGetExtension (filePath) {
  // console.log(filePath)
  let label = ''
  const fileExtension = filePath.split('.').pop()
  // console.log(fileExtension)
  fileExtension === 'mp4' ? label = 'video' : label = 'img'
  // console.log(label)
  return label
}