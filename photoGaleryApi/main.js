import './style.css'

// Layout

const Layout = `
<header></header>
<section></section>
<footer></footer>
`
// NavBar
const NavBar = `
<nav>
  <img src = "/icons8-galería-64.png" alt="icons8-galería-64" class = "LogoNav"></img>
  <input type="text" id = "searchBar" placeholder = "search"></input>
  <button id="button"> <img src="icons8-búsqueda-30.png" alt="icons8-búsqueda-30" class = "iconoNav"> </img> </button> 
  <a href ="#" > <img src="icons8-recordatorios-de-citas-64.png" alt="Notification" class = "iconoNav"> </img> </a>
</nav>`

document.querySelector('#app').innerHTML = Layout
document.querySelector('header').innerHTML = NavBar

// Speack with the API UNPLASH
import { createApi } from 'unsplash-js'
// Uses a key saved in.env
const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})
// Uses its own method to get the info
const searchPhotos = async (keyword) => {
  const images = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return images
}

//Galery
const galleryTemplate = () => {
  return `
  <div class= "gallery"></div>`
}

// Photo Template
const photoCardTeplate = (item, clase = '') => {
  return `
  <div class="photoTemplate ${clase}">
     <img class= "photo" src =${item.urls.regular} alt= ${item.alt_description}></img>
     <div class="photoDescription hidden">
     <p>Author:  ${item.user.name}</p>
     <div>
      <img src="icons8-me-gusta-64.png" alt="icons8-me-gusta-64" class = "iconoPhoto"> </img>
      <p>${item.likes}<p>
      </div>
      <span>${item.links.download}</span>
      <button class="buttonDownload">Download</button>
      </div>
  </div>
`
}

const downloadPhoto = () => {
  console.log('hello')
}
// printGallery
const printGalery = (photos) => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  let count = 1

  for (const element of photos) {
    let clase = ''
    if (count % 6 == 0) {
      // clase = 'gallery2cols'
      clase = 'gallery2rowscols'
    } else if (count % 4 == 0) {
      clase = 'gallery2cols'
    } else if (count % 2 == 0) {
      clase = 'gallery2rows'
    }
    gallery.innerHTML += photoCardTeplate(element, clase)
    count += 1
  }
}

// search bar
const buttonListener = async () => {
  const searchBar = document.getElementById('searchBar')
  const button = document.getElementById('button')
  button.addEventListener('click', async () => {
    const photos = await searchPhotos(searchBar.value)
    printGalery(photos.response.results)
  })
  searchBar.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
      const photos = await searchPhotos(searchBar.value)
      printGalery(photos.response.results)
    }
  })
}

const printTemplate = async () => {
  document.querySelector('section').innerHTML = galleryTemplate()
  buttonListener()

  // Print an initial set of pictures
  const images = await searchPhotos('dog')
  printGalery(images.response.results)
}
printTemplate()
