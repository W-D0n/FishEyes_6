import { getData, myFunction, tagItemsCreation } from './functions.js'

const apiUrl = './src/assets/data/FishEyeData.json'
// const apiUrl = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json'
// const apiUrl = '../../assets/data/photographers.json'



getData(apiUrl).then((data) => {
  const photographersData = data.photographers
  const mediaData = data.media
  //console.log(photographersData)

  photographersData.forEach(el => {
    const { name, id, city, country, tags, tagline, price, portrait } = el
    myFunction(name, city, country, tagline, price, portrait)
    console.log(portrait)
    tags.forEach(tag => {
      tagItemsCreation (tag)
    }) 
  })
  // mediaData.forEach(el => {
  //   console.log(el.id)
  // });
}).catch((err) => {
  console.log(err);
})
//creation ()