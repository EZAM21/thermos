let afficheTemperature = document.querySelector('#afficheTemperature');
let latitude;
let longitude;

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        const temperatureData = await getTemperatureData(); // Utilisation de "await" ici
        const temperature = Math.ceil(temperatureData);

        afficheTemperature.innerHTML = `<h2>${temperature}<sup>°</sup>C</h2>`;
        afficheTemperature.classList.add("show");
    }, (error) => {
        console.error("Erreur :", error);
        afficheTemperature.textContent = "Erreur lors de la récupération de la position.";
        afficheTemperature.classList.add("error");
    });
});

async function getTemperatureData() {
    const apiURL = `https://weather.contrateumdev.com.br/api/weather?lat=${latitude}&lon=${longitude}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.main.temp;
}









