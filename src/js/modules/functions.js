const main = document.getElementById('main-content')

const imgPath = './src/assets/img/Photographers_ID/NabeelBradford.jpg'
/* Dynamiser l'attribution de l'image : imgPath + la valeur du champ portrait du json */
// Setup html card grid
const cardGridDiv = document.createElement('div')
cardGridDiv.setAttribute('class', 'card__grid')
cardGridDiv.setAttribute('id', 'cardGrid')
main.appendChild(cardGridDiv)
const tagList = document.getElementById('tagList')

export async function getData (url) {
  const response = await fetch(url)

  if (!response.ok) {
    console.log('Retour serveur : ' + response.status)
  } else {
    // console.log(response.status);
    const profilData = await response.json()
    return profilData
  }
};

export async function createProfil(name, city, country, tags, tagline, price, portrait) {
  const profilDiv = document.createElement('div')
  profilDiv.setAttribute('class', 'profil__container')
  profilDiv.setAttribute('id', 'profilContainer')
  cardGridDiv.appendChild(profilDiv)

  profilDiv.innerHTML = `
  <a href="#">
    <div class="profil__img__container">
      <img src="./src/assets/img/Photographers_ID/${portrait}" alt="Profil image" class="img__profil" />
    </div>
    <h2 class="profil__name">${name}</h2>
    <div class="profil__description">
      <h3 class="location">${country}, <span>${city}</span></h3>
      <p class="description__text">${tagline}</p>
      <p class="desription__price">${price}<span id="currency">€</span>/jour</p>
    </div>
  </a>
  `
  const newTagList = document.createElement('ul')
  newTagList.setAttribute('class', 'profil__tag-list')
  profilDiv.appendChild(newTagList)
  tags.forEach(tag => {
    const newTagItem = document.createElement('li')
    newTagItem.setAttribute('class', 'profil__tag-item')
    newTagList.appendChild(newTagItem)
    newTagItem.innerHTML = `#${tag}`
  })
}