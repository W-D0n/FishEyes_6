const main = document.getElementById('main-content')

const imgPath = './src/assets/img/Photographers_ID/NabeelBradford.jpg'
/* Dynamiser l'attribution de l'image : imgPath + la valeur du champ portrait du json */
//Setup html card grid 
const cardGrid_Div = document.createElement('div')
cardGrid_Div.setAttribute('class', 'card__grid')
cardGrid_Div.setAttribute('id', 'cardGrid')
main.appendChild(cardGrid_Div)
const tagList = document.getElementById('tagList')

export async function getData (url) {
  const response = await fetch (url)

  if (!response.ok) {
    console.log('Retour serveur : ' + response.status)
  } else {
    // console.log(response.status);
    const profilData = await response.json()
    return profilData
  }
};

export async function myFunction(name, city, country, tagline, price, portrait) {
  const profil_Div = document.createElement('div')
  profil_Div.setAttribute('class', 'profil__container')
  profil_Div.setAttribute('id', 'profilContainer')
  cardGrid_Div.appendChild(profil_Div)

  profil_Div.innerHTML = `
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
    
    <ul class="profil__tag-list" id="tagList">
    </ul>
  `
  profil_Div.appendChild(profil_Div) 
}
export async function tagItemsCreation (tag) {
  const profilTagItem = document.createElement('li')
  profilTagItem.setAttribute('class', 'profil__tag-item')
  profilTagItem.setAttribute('id', 'tagItem')
  tagList.appendChild(profilTagItem)
  profilTagItem.innerHTML = tag
}