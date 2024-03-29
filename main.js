// Global Selectors
const joblistContainer = document.querySelector('#jobList')
const filterBar =  document.querySelector("#filterBar")
const clear = document.querySelector("#clear")

// Global Variables
let filterAdded = {}
let target = ''


// fetch is used to get the data from data.json file dynamically in html.
  fetch('./data.json')
  .then(res => {
     if(!res.ok) {
      throw new Error('Failed to fetch data')
     }
     return res.json()
  })
   .then(data => {
      data.forEach(data => {
  
          let language = data.languages.map(lang => `<button class="filterBtns tracking-wide bg-filterBg py-1 px-3 rounded-md transition duration-200 ease-in hover:bg-primary hover:text-white">${lang}</button>`).join(' ')
      
          let tool = data.tools.map(tool => `<button class="filterBtns tracking-wide bg-filterBg py-1 px-3 rounded-md transition duration-200 ease-in hover:bg-primary hover:text-white">${tool}</button>`).join(' ')
          
         
          // Add job cards in the job list container
          let cardHtml = `<div class="card max-[767px]:flex-col max-[767px]:items-start max-[767px]:relative max-[767px]:mb-14 flex justify-between items-center rounded-md bg-white shadow-lg shadow-primary/20 p-7 max-[430px]:p-5 mb-5 ${data.featured ? "border-l-8" : ''} border-primary tracking-wide font-bold">
          <div class="flex gap-5 items-center pr-8">
          <div class="max-[767px]:absolute max-[767px]:-top-8"><img class="max-w-none max-[767px]:w-[75%]" src="${data.logo}" alt="Company Logo"></div>
          <div class="max-[767px]:pt-4 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-3">
            <div class="flex items-baseline gap-1">
            <h1 class="text-primary mr-3">${data.company}</h1>
            ${data.new ? '<span class="text-white bg-primary rounded-full pt-1 px-2 text-sm">NEW!</span>' : ''}
            ${data.featured ? '<span class="text-white bg-dark rounded-full pt-1 px-2 text-sm">FEATURED</span>' : ''}
            
          </div>
            <h2 class="text-dark text-xl cursor-pointer hover:text-primary transition duration-200 ease-in py-2">${data.position}</h2>
            <div class="flex gap-3 max-[400px]:gap-1 items-center text-lightText font-light">
              <p>${data.postedAt}</p>
              <p>&#8226;</p>
              <p>${data.contract}</p>
              <p>&#8226;</p>
              <p>${data.location}</p>
            </div>
          </div>
        </div>
        <div class="max-[767px]:border-[0.20px] max-[767px]:border-lightText max-[767px]:w-full max-[767px]:my-5"></div>
         <div class="tags text-primary gap-3 items-center text-[1rem]">
           <button class="filterBtns tracking-wide bg-filterBg py-1 px-3 rounded-md transition duration-200 ease-in hover:bg-primary hover:text-white">${data.role}</button>
           <button class="filterBtns tracking-wide bg-filterBg py-1 px-3 rounded-md transition duration-200 ease-in hover:bg-primary hover:text-white">${data.level}</button>
          ${language}
          ${tool}
         </div>
        </div>`


        joblistContainer.insertAdjacentHTML('beforeend', cardHtml)
      })



//************* Functionality for filtering by tags **************/
const filterBtns = document.querySelectorAll('.filterBtns')
const jobCards = document.querySelectorAll('.card')


function showFilterBar() {
   filterBar.style.display = "flex"
   joblistContainer.classList.add('tablet-padding')
   joblistContainer.classList.add('mobile-padding')
}

function hideFilterBar() {
  filterBar.style.display = "none"
  joblistContainer.classList.remove('tablet-padding')
  joblistContainer.classList.remove('mobile-padding')
}

function showAllCards() {
  jobCards.forEach(card => card.style.display = 'flex')
}


filterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Show selected filter Buttons to the filterbar
     showFilterBar()
    
     target = e.target.textContent
     if(!filterAdded[target]) {
      filterAdded[target] = true
      addFilterCapsule(target)
      filterCards()
     }
     
})
})

// Add selected filter buttons in the filter bar
function addFilterCapsule(target) {

  let filterBtnHtml = `<div class="flex" id="filterBtn">
  <div class="bg-filterBg py-1 px-3 rounded-l-md">${target}</div>
  <button class="removeIcon bg-primary px-3 rounded-r-md transition duration-200 ease-in hover:bg-dark"><img src="images/icon-remove.svg" class="" alt="Remove Icon"></button>
</div>`

  filterBar.querySelector('#filterTags').insertAdjacentHTML('beforeend', filterBtnHtml)
  const removeBtn = document.querySelectorAll('.removeIcon')
  removeFilterCapsule(removeBtn)
}


// filter the cards by tags
function filterCards() {
  const filterContents = Object.keys(filterAdded)
    jobCards.forEach(card => {
      const cardContent = card.textContent
      const shouldShowCard = filterContents.every((filterContent) => cardContent.includes(filterContent))
      card.style.display = shouldShowCard ? 'flex' : 'none'
    })
}



function removeFilterCapsule(removeBtn) {
  removeBtn.forEach(b => {
    b.addEventListener('click', (e) => {
      const filterTablet = e.target.closest('BUTTON').parentElement
      const removedFilterTarget = filterTablet.textContent.trim().replace('x', '')
      delete filterAdded[removedFilterTarget]
      filterTablet.remove()
      filterBar.textContent.trim() === 'Clear' ? clearAllFilters() : null
      filterCards()
    })
  })
}


function clearAllFilters() {
  const clearElements = document.querySelectorAll('#filterBtn')
  clearElements.forEach(el => el.remove())
  filterAdded = {}
  hideFilterBar()
  showAllCards()
}

clear.addEventListener('click', (e) => {
   e.preventDefault()
   clearAllFilters()
})
 

   })






