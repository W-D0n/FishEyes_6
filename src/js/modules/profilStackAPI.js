import { getData } from './functions.js'

const apiUrl = '../../../assets/data/FishEyeData.json'
// const apiUrl = '../../../assets/data/photographers.json'

getData(apiUrl).then((data) => {
  const photographersData = data.photographers
  // eslint-disable-next-line no-unused-vars
  const mediaData = data.media
  console.log(photographersData)

  photographersData.forEach(el => {
    const { name, id } = el
    console.log(name)
    console.log(id)
    // console.log(el.city)
    // console.log(el.country)
  })
  // mediaData.forEach(el => {
  //   console.log(el.id)
  //   console.log(el.photographerId)
  //   console.log(el.title)
  // });
}).catch((err) => {
  console.log(err)
})

// //Construction par class
// export default class Profil {
//   constructor(name, id, city) {
//     this.name = name
//     this.id = id
//     this.city = city
//     this.country = country,
//     this.tagline = tagline,
//     this.price = price,
//     this.portrait = portrait
//   }
// };
// export function printProfil(profil) {
//   // console.log(`${profil.name} ${profil.id} ${profil.city} ${profil.country} ${profil.tagline} ${profil.price} ${profil.portrait}`);
//   console.log(`${profil.name} ${profil.id} ${profil.city}`);
// };
