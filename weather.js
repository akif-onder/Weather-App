const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem("apiKey", "#");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //! submitin default özelliği olarak, basıldığında sayfayı yenileyor. bunu önlemek için prevent default kullanıyoruz.
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  // alert("http request sent");
  // input.value = ''; //?inputun içinde kalan yazıyı temizlemek için..

  //* bu aşamada API'ya istek gönderip veri alacağız. Bunun için fetch metodunu ya da Axios'u kullanacağız. Axios bir method değil bir pakettir. Fetch JS'in kendi methodudur. axios ise bir kütüphanedir.

  //*fetch ile işlem yapıldığında JSON ile gönderilip, alırsen JSON.parse yapmak gerekiyor. Ancak axios için bunları yapmaya gerek yok. alırken ve verirken kendisi otomatik JSON formatına dönüştürüyor.
  // axios kullanmak için HTML head'e script olarak link yazıyoruz.

  let tokenKey = localStorage.getItem("apiKey");

  let inputVal = input.value;
  let unitType = "metric";
  let lang = "tr";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}&lang=${lang}`;

  try {
    // const response = await fetch(url).then(response => response.json()); //! we wrote this to see the difference...

    const response = await axios(url); //* axios.post yazılabilir. birşey yazılmazsa get olaraka çalışır.

    const { name, main, sys, weather } = response.data;

    console.log(response.data);

    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;


    //! daha önceden bakıp ekrana yazdırdığımız şehir kartını tekrar sorgularsak ekrana ikinci kez yazdırmasın diye engelleme yapıyoruz..

    //* forEach => array ve nodeList lerde kullanılabilir.
    //* filter, map, reduce => sadece array lerde kullanılır..

    const cityListItems = list.querySelectorAll(".city");
    const cityListItemsArray = Array.from(cityListItems);
    if (cityListItemsArray.length > 0) {
        const filteredArray = cityListItemsArray.filter(cityCard => cityCard.querySelector("span").innerText == name);
        if (filteredArray.length > 0) {
            msg.innerText = `You have the weather for ${name}. Please search for another city 😸...`;
            setTimeout(()=>{
                msg.innerText = '';
            }, 5000);
            form.reset();
            return;
        }
    }


    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    const createdLiInnerHTML = `<h2 class="city-name" data-name="${name}, ${
      sys.country
    }">
        <span>${name}</span>
        <span>${sys.country}</span>
    </h2>
    <div class="city-temp">${Math.round(main.temp)} <sup>0</sup>C</div>
    <figure>
        <img class="city-icon" src="${iconUrl}" alt="" />
        <figcaption>${weather[0].description}</figcaption>
        </figure>`;
    
    createdLi.innerHTML = createdLiInnerHTML;
    list.prepend(createdLi);
  } catch (error) {
    msg.innerText = error;
    setTimeout(()=>{
        msg.innerText='';
    }, 5000);
  }

  form.reset(); //!İnputun içini temizlemek için daha güzel bir yöntem. Form tag inin bir metodu.
};
