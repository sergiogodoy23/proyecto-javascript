let datos = document.getElementById("datos")
let tableUpcoming = document.getElementById("tableUpcoming")
let tablePast = document.getElementById("tablePastEvents")
let line1__bars = document.querySelector(".line1__bars-menu");
let line2__bars = document.querySelector(".line2__bars-menu");
let line3__bars = document.querySelector(".line3__bars-menu");
let nav = document.querySelector(".nav-items");


    document.addEventListener("DOMContentLoaded", ()=> {
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
        tableAllEvents(data)
        upcomingEvents(data)
        pastEvents(data)
        
  }


const tableAllEvents = (array) => {

    const eventHigh = array.sort((a, b) => b.assistance - a.assistance)[0];
    const eventLow = array.sort((a, b) => a.assistance - b.assistance)[0];
    const highCapacity = array.sort((a, b) => b.capacity - a.capacity)[0];
    
    
    datos.innerHTML = `
    <td>name: ${eventHigh.name} - Assitance: ${eventHigh.assistance}</td>
    
    <td>name: ${eventLow.name} - Assitance: ${eventLow.assistance}</td>

    <td>name: ${highCapacity.name} - Capacity: ${highCapacity.capacity}</td>
    `
}




const upcomingEvents = (array) => {

    const upcomingEvents = array.filter( event => event.estimate)


    function categoriesArray() {
        const categories = {};
      
        upcomingEvents.forEach(evento => {
          const { category, price, estimate,capacity } = evento;
      
          if (!categories[category]) {
            categories[category] = { category, price, estimate, capacity};
          }
      
          categories[category].price += price * estimate;
          categories[category].estimate += estimate;
          categories[category].capacity += capacity
        });
      
        return Object.keys(categories).map(category => categories[category]);
      }
    
      
      const totalCategories = categoriesArray(upcomingEvents)
      
      const percentageEvents = totalCategories.map(event => {

        const percentage = (event.estimate * 100) / event.capacity

        return {
            ...event,
            percentage
        }
      })

      percentageEvents.forEach(event => {
        tableUpcoming.innerHTML+= `
        
        <tr>
            <td> ${event.category}</td>
            <td> $${event.price}</td>
            <td>%${event.percentage}</td>
        </tr>
        `
      })
}


const pastEvents = (array) => {

    const pastEvents = array.filter( event => event.assistance)


    function categoriesArray() {
        const categorias = {};
      
        pastEvents.forEach(evento => {
          const { category, price, assistance,capacity } = evento;
      
          if (!categorias[category]) {
            categorias[category] = { category, price, assistance, capacity, eventCount: 1 };
          }
      
          categorias[category].price += price * assistance;
          categorias[category].assistance += assistance;
          categorias[category].eventCount += 1;
          categorias[category].capacity += capacity
        });
      
        return Object.keys(categorias).map(category => categorias[category]);
      }

      const totalCategories = categoriesArray(pastEvents);
        


      const percentageEvents = totalCategories.map(event => {

        const percentage = (event.assistance * 100) / event.capacity

        return {
            ...event,
            percentage
        }
      })

      percentageEvents.forEach(event => {
        tablePast.innerHTML+= `
        
        <tr>
            <td> ${event.category}</td>
            <td> $${event.price}</td>
            <td>%${event.percentage.toFixed(2)}</td>
        </tr>
        `
      })
}

