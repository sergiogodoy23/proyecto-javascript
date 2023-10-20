
let contenedor = document.getElementById("contenedor-productos");
let contenedorCategorias = document.getElementById("checkboxContainer");
let inputSearch = document.getElementById("search");
let cardsHero = document.getElementById("cards-hero");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let messageError = document.getElementById("message-error")
let loading = document.getElementById("loading")
let nav = document.querySelector(".nav-items");



let line1__bars = document.querySelector(".line1__bars-menu");
let line2__bars = document.querySelector(".line2__bars-menu");
let line3__bars = document.querySelector(".line3__bars-menu");



document.addEventListener('DOMContentLoaded', () => {
    
    fetchData()
   
})
document.querySelector(".bars__menu").addEventListener("click", animateBars);


function animateBars(){

    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");

    nav.classList.toggle("nav_menu")
}


const fetchData = async() => {
    let data = []
    try {
        const response = await axios.get("https://mindhub-xj03.onrender.com/api/amazing");
        data = response.data.events
      } catch (error) {
        console.error(error);
      }
    filterInputs(data)
    renderCardsHero(data)
    renderEvents(data)
    renderCategories(data)
    filters(data)
      
}





          
function filterInputs(array) {
    
    checkboxes.forEach((checkbox) => checkbox.addEventListener('change', function(){
        filters(array)
    }));
    inputSearch.addEventListener('input', function(){
        filters(array)
    });
}



function filters(array) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const filtersCheckbox = Array.from(checkboxes).map((checkbox) => checkbox.id);
  
    const search = inputSearch.value.toLowerCase().trim();
  
    const elementFilters = array.filter((event) => {
      if (filtersCheckbox.length === 0) return true;
      return event.category
      .split(',')
      .some((option) => filtersCheckbox.includes(option.trim()));
    });
  
    const elementsFilterSearch = elementFilters.filter((element) =>
      element.name.toLowerCase().includes(search)
    );

    if(elementsFilterSearch.length === 0){
        messageError.style.display = "block"
    }
    
    else{
        messageError.style.display = "none"
    }

  
    renderEvents(elementsFilterSearch);
  }




const renderCategories = (array) => {  
    
    let arrSinDuplicaciones = []

    for (let i = 0; i < array.length; i++) {
        if(!arrSinDuplicaciones.includes(array[i].category)){
            arrSinDuplicaciones.push(array[i].category)
        }
        
    }

    arrSinDuplicaciones.forEach((category) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = category;
        checkbox.addEventListener('change', function(){
            filters(array)
        });
        checkboxContainer.appendChild(checkbox);
        const label = document.createElement('label');
        label.textContent = category;
        label.style.color = "white"
        checkbox.classList.add("checkboxStyle") 
        label.appendChild(checkbox)    
        contenedorCategorias.appendChild(label);
      });


}


    const renderCardsHero = (array) => {
        let imagenes = ''
        array.slice(0, 4).forEach(( event) => {

            imagenes+=`
                <img class="img-hero" src="${event.image}" alt="">
            `
        })

        cardsHero.innerHTML = imagenes
        
    }

    


   
 const renderEvents = (array) => {
     let result = "";


     array.forEach((event) => {
        
         const { name, image, price, description } = event;
      
         result += `
           <div class="product-card">
               <img class="image-product" src="${image}" alt="">
               <div class="text-product">
                   <h3>${name}</h3>
                   <p class="product-descripcion">${description}</p>
                   <p class="product-price">$${price}</p>

               </div>
            <div class="product-footer">
                   <a href="./pages/detail.html?name=${name}">Ver mas</a>
               </div>
           </div>  
        `;
       });
       contenedor.innerHTML = result 

 }



