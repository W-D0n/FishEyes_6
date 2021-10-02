import { getData, createProfil } from './functions.js'

const apiUrl = './src/assets/data/FishEyeData.json'
// const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json'
// const apiUrl = '../../assets/data/photographers.json'

getData(apiUrl).then((data) => {
  const photographersData = data.photographers

  photographersData.forEach(el => {
    const { name, id, city, country, tags, tagline, price, portrait } = el
    createProfil(name, city, country, tags, tagline, price, portrait)
    console.log(portrait)
  })  
}).catch((err) => {
  console.log(err);
})

//const mediaData = data.media
// mediaData.forEach(el => {
  //   console.log(el.id)
  // });