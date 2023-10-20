let nav = document.querySelector(".nav-items");
let line1__bars = document.querySelector(".line1__bars-menu");
let line2__bars = document.querySelector(".line2__bars-menu");
let line3__bars = document.querySelector(".line3__bars-menu");
var urlParams = new URLSearchParams(window.location.search);
var nameParameter = urlParams.get('name');
let containerDetail = document.getElementById('container-detail')


document.addEventListener('DOMContentLoaded', () => [
    fetchData()
])

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
        events(data)
    }


function events(array){

    const event = array.find((event) => event.name.toLowerCase() == nameParameter.toLowerCase() )

    if(typeof event === "undefined"){
        containerDetail.innerHTML = `<h2 class="message-detail">Evento no existente</h2>`

    }
   
    const {name, category, description,date, place, price, capacity} = event

        let result = ""

        result+=`
        <div class="detail-container">
            <img class="detail-image" src=${event.image} alt="">
            <div class="detail-info">
                <div class="detail-header">
                    <h3 class="detail-name">${name}</h3>
                    <p class="detail-price">$${price}</p>
                </div>
                <p class="detail-description">${description}</p>
                <div>
                
                <div class="detail-dates">
                    
                    <span class="detail-date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                    <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    ${date}</span>
                    <p class="detail-category">Category: ${category}</p>
                </div>
                    <div class="detail-footer">
                    <p class="detail-assistance">Place: ${place}</p>
                    <p class="detail-assistance">Capacity: ${capacity}</p>
                    </div>
                    
                </div>
            </div>
         </div>
        `
       
            containerDetail.innerHTML = result
        

}

