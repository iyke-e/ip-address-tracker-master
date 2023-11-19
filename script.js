const ipInput = document.querySelector("input")
const submitBtn = document.querySelector("button")
const currentip = document.querySelector(".current_ip_address")
const api = {
    ipstack_key: '319cc3732692547524a984b6b7e7ef67',
    positionstack_key: '3021bde901e93955d3a11fd48450c565'
}


const getMyIp = async() => {
    const response = await fetch("https://api64.ipify.org?format=json")
    const data = await response.json()
    currentip.innerHTML = `Your current IP address is ${data.ip}`
    localStorage.setItem('currentIp', data.ip)
    console.log(data)
}
getMyIp()

const ipAdd = localStorage.getItem('currentIp')
currentip.innerHTML = `Your current IP address is ${ipAdd}`

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetchLocation()
})


const fetchLocation = async() => {
    const response = await fetch(`http://api.ipstack.com/${ipInput.value.trim()}?access_key=${api.ipstack_key}`);
    const data = await response.json();
    const stringData = JSON.stringify(data)
    localStorage.setItem('ipLocation', stringData)
    console.log(localStorage.getItem("ipLocation"))
    JSON.parse(localStorage.getItem("ipLocation"))
    location.reload()
}








const storedLocation = JSON.parse(localStorage.getItem("ipLocation"))

console.log(storedLocation)
document.querySelector(".ipAddress").innerHTML = storedLocation.ip
document.querySelector(".location").innerHTML = `${storedLocation.city}, ${storedLocation.country_name}`
document.querySelector(".timezone").innerHTML = `${storedLocation.continent_name}`
document.querySelector(".isp").innerHTML = storedLocation.zip


let lat = storedLocation.latitude;
let lng = storedLocation.longitude;

var map = L.map('map').setView([lat, lng], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle = L.circle([lat, lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 100
}).addTo(map);

var marker = L.marker([lat, lng]).addTo(map);