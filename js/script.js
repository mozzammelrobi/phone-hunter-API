const loadPhone = async (searchText=13,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones, isShowAll)

}


const displayPhones = (phones,isShowAll) => {
    // 1.  where to append 
    const phonesContainer = document.getElementById('phones-container')
    // clear phone container before adding new card by search
    phonesContainer.textContent = ''

    // display show all button if phones more than 10
    const showAllBtbContainer =  document.getElementById('show-all-btn-container')
    if(phones.length > 10 ){
       showAllBtbContainer.classList.remove('hidden')
    }else{
        showAllBtbContainer.classList.add('hidden')
        if(isShowAll){
            showAllBtbContainer.classList.add('hidden')
        }
    }
        // console.log('isshow all', isShowAll)
    // display phones if pnones length is grater then 10 and if not show all button
    // phones = phones.slice(0,10)
    if(!isShowAll){
        phones = phones.slice(0,10)
    }
    
    phones.forEach((phone) => {
        //  console.log(phone)
        // 2. create a div (what to apppen)
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card my-12 bg-base-100 p-4 shadow-xl'
        // 3. set inner HTML 
        phoneCard.innerHTML = `    
         <figure>
             <img src="${phone.image}" alt="Shoes"/>
         </figure>
         <div class="card-body">
           <h2 class="card-title">${phone.phone_name} </h2>
           <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-center">
             <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Shoe Details</button>
           </div>
         </div>
         `
        phonesContainer.appendChild(phoneCard)
    });
    toggleLoadingSpenner(false)

}


// 
const handleShowDetails = async (id) => {
    // console.log('show btn click',id)
     // load single phone data or details
     const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
     const data = await res.json();
     const phone = data.data

     showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName  = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
        <p><span>Storage:</span> ${phone?.mainFeatures?.storage}</P>
        <p><span>GPS:</span>${phone?.others?.GPS}</p>
        <p><span>ReaseaseDate</span>${phone?.releaseDate}</p>
        <p><span>Brand:</span>${phone?.brand}</p>
        <p></p>

    `

    // show the modal
    show_details_modal.showModal()
}


// handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpenner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText)
    loadPhone(searchText, isShowAll)

}
// search handler button 2 recap
// const handleSearch2 = () => {
//     toggleLoadingSpenner(true)
//     const searchField = document.getElementById('search-field2')
//     const searchText = searchField.value
//     // console.log(searchText)
//     loadPhone(searchText)
// }

const toggleLoadingSpenner = (isLoading) => {
    const loadingSpenner = document.getElementById('loading-spenner');
    if(isLoading){
        loadingSpenner.classList.remove('hidden')
    }else{
        loadingSpenner.classList.add('hidden')
    }
}


// handle show all btn
const handleShowAll = () => {
    handleSearch(true)
} 


loadPhone()