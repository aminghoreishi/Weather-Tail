import {
  btn,
  input,
  name,
  Whe,
  dateNow,
  temp,
  tempWeather,
  minMax,
  months,
  days,
  svgADD,
  wif,
  checkWifi,
  borderOnline,
} from "./module.js";
//* Dark Mode
btn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.className.includes("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

let flag = false;



window.addEventListener("load", () => {
  let getLocal = localStorage.getItem("theme");
  if (getLocal === "dark") {
    document.documentElement.classList.add("dark");
  }

  setInterval(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status === 200) {
          if (!flag) {
            checkWifi.innerHTML = `You're <span class="text-green-500">online</span> Now`;
            borderOnline.classList.add("border-green-600");
            console.log(response.status);
            wif.classList.remove("-left-96");
            wif.classList.add("left-2");
            setTimeout(() => {
              wif.classList.add("-left-96");
              wif.classList.remove("left-2");
            }, 3000);
            // location.href = location.href
          }
          flag = true
        } else {
          offline();
        }
      })
      .catch(() => {
        offline();
        flag = false
      });
  }, 300);
});

function offline() {
  wif.classList.remove("-left-96");
  wif.classList.add("left-2");
  checkWifi.innerHTML = `You're <span class="text-red-600">offline</span> Now`;
  borderOnline.classList.remove("border-green-600");
  borderOnline.classList.add("border-red-600");
}

////////////////////////////////////////////////////////////////////////////x

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let inputVal = input.value.toLowerCase();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=eecc6992f4fa2ebd4ccc3e779748b2cd`
    )
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((response2) => {
        domAdd(response2);
      })
      .catch(() => {
        input.classList.remove("border-gray-100");
        input.classList.remove("dark:border-gray-100/15");
        input.classList.add("border-red-600");
        Whe.classList.add("hidden");

        input.classList.add("dark:border-red-600");
      })
      .finally(() => {
        input.value = "";
      });
  }
});

function domAdd(response2) {
  console.log(response2);
  Whe.classList.remove("hidden");
  input.classList.add("border-gray-100");
  input.classList.add("dark:border-gray-100/15");
  input.classList.remove("border-red-600");

  input.classList.remove("dark:border-red-600");
  name.innerHTML = `${response2.name} , ${response2.sys.country}`;

  let newDate = new Date();

  let monthDom = months.find((item, i) => i == newDate.getMonth());
  let DayDom = days.find((item, i) => i == newDate.getDay());

  console.log(DayDom);
  console.log(monthDom);

  dateNow.innerHTML = `${DayDom} ${newDate.getDate()} ${monthDom} ${newDate.getFullYear()}`;

  temp.innerHTML = `${Math.floor(response2.main.temp - 273.15)}°C`;

  tempWeather.innerHTML = response2.weather[0].main;

  if (response2.weather[0].main === "Rain") {
    svgADD.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34141 6C7.16508 3.66962 9.38756 2 12 2C15.3137 2 18 4.68629 18 8C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16H7C4.23858 16 2 13.7614 2 11C2 8.46898 3.8806 6.37721 6.32069 6.04576" stroke="#1E88E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 20L6 22" stroke="#1E88E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 20L11 22" stroke="#1E88E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 20L16 22" stroke="#1E88E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  }
  if (response2.weather[0].main === "Clear") {
    svgADD.innerHTML = `<svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="m 7.5 0 c -0.277344 0 -0.5 0.222656 -0.5 0.5 v 2 c 0 0.277344 0.222656 0.5 0.5 0.5 h 1 c 0.277344 0 0.5 -0.222656 0.5 -0.5 v -2 c 0 -0.277344 -0.222656 -0.5 -0.5 -0.5 z m -4.449219 1.84375 c -0.128906 0 -0.253906 0.046875 -0.351562 0.144531 l -0.710938 0.710938 c -0.195312 0.195312 -0.195312 0.507812 0 0.707031 l 1.417969 1.414062 c 0.195312 0.195313 0.507812 0.195313 0.707031 0 l 0.707031 -0.707031 c 0.195313 -0.199219 0.195313 -0.511719 0 -0.707031 l -1.414062 -1.417969 c -0.101562 -0.097656 -0.226562 -0.144531 -0.355469 -0.144531 z m 9.898438 0 c -0.128907 0 -0.253907 0.046875 -0.355469 0.144531 l -1.414062 1.417969 c -0.195313 0.195312 -0.195313 0.507812 0 0.707031 l 0.707031 0.707031 c 0.199219 0.195313 0.511719 0.195313 0.707031 0 l 1.417969 -1.414062 c 0.195312 -0.199219 0.195312 -0.511719 0 -0.707031 l -0.710938 -0.710938 c -0.097656 -0.097656 -0.222656 -0.144531 -0.351562 -0.144531 z m -4.949219 2.164062 c -2.195312 0 -4 1.804688 -4 4 c 0 2.191407 1.804688 4 4 4 s 4 -1.808593 4 -4 c 0 -2.195312 -1.804688 -4 -4 -4 z m -7.5 2.992188 c -0.277344 0 -0.5 0.222656 -0.5 0.5 v 1 c 0 0.277344 0.222656 0.5 0.5 0.5 h 2 c 0.277344 0 0.5 -0.222656 0.5 -0.5 v -1 c 0 -0.277344 -0.222656 -0.5 -0.5 -0.5 z m 13 0 c -0.277344 0 -0.5 0.222656 -0.5 0.5 v 1 c 0 0.277344 0.222656 0.5 0.5 0.5 h 2 c 0.277344 0 0.5 -0.222656 0.5 -0.5 v -1 c 0 -0.277344 -0.222656 -0.5 -0.5 -0.5 z m -9.742188 4.035156 c -0.128906 0 -0.253906 0.046875 -0.351562 0.144532 l -1.417969 1.414062 c -0.195312 0.199219 -0.195312 0.511719 0 0.707031 l 0.710938 0.710938 c 0.195312 0.195312 0.507812 0.195312 0.707031 0 l 1.414062 -1.417969 c 0.195313 -0.195312 0.195313 -0.507812 0 -0.707031 l -0.707031 -0.707031 c -0.101562 -0.097657 -0.226562 -0.144532 -0.355469 -0.144532 z m 8.484376 0 c -0.128907 0 -0.253907 0.046875 -0.355469 0.144532 l -0.707031 0.707031 c -0.195313 0.199219 -0.195313 0.511719 0 0.707031 l 1.414062 1.417969 c 0.199219 0.195312 0.511719 0.195312 0.707031 0 l 0.710938 -0.710938 c 0.195312 -0.195312 0.195312 -0.507812 0 -0.707031 l -1.417969 -1.414062 c -0.097656 -0.097657 -0.222656 -0.144532 -0.351562 -0.144532 z m -4.742188 1.964844 c -0.277344 0 -0.5 0.222656 -0.5 0.5 v 2 c 0 0.277344 0.222656 0.5 0.5 0.5 h 1 c 0.277344 0 0.5 -0.222656 0.5 -0.5 v -2 c 0 -0.277344 -0.222656 -0.5 -0.5 -0.5 z m 0 0" fill="#FDD835"/>
</svg>`;
  }
  if (response2.weather[0].main === "Clouds") {
    svgADD.innerHTML = `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.38846 12.7023C3.98522 12.1237 3 10.7636 3 9.17807C3 7.42863 4.3 5.8125 6.25 5.5C6.86168 4.0617 8.30934 3 9.9978 3C12.1607 3 13.9285 4.65893 14.05 6.75C14.8721 7.10549 15.5169 7.83126 15.8166 8.69914M5.38846 12.7023C4.50928 13.5938 4 14.7867 4 16.0315C4 18.7755 6.28335 21 9.1 21L16.75 21C19.0972 21 21 19.1279 21 16.8185C21 15.1039 19.951 13.5202 18.45 12.875C18.3457 11.0905 17.3135 9.5483 15.8166 8.69914M5.38846 12.7023C6.11557 11.9651 7.0957 11.4339 8.25 11.25C9.04989 9.3802 10.943 8 13.151 8C14.1227 8 15.0333 8.25474 15.8166 8.69914" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
  if (response2.weather[0].main === "Hazy") {
    svgADD.innerHTML = `<svg 
  xmlns="http://www.w3.org/2000/svg"
  width="40px"
  height="40px"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#F4511E"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5.2 6.2l1.4 1.4" />
  <path d="M2 13h2" />
  <path d="M20 13h2" />
  <path d="M17.4 7.6l1.4-1.4" />
  <path d="M22 17H2" />
  <path d="M22 21H2" />
  <path d="M16 13a4 4 0 00-8 0" />
  <path d="M12 5V2.5" />
</svg>`;
  }

  minMax.innerHTML = `${Math.floor(
    response2.main.temp_min - 273.15
  )} / ${Math.floor(response2.main.temp_max - 273.15)}`;
}

