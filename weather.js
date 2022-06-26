const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg")
const list = document.querySelector(".ajax-section .cities")

localStorage.setItem("apiKey","Key is hidden after posting to local Storage");

form.addEventListener("submit", (e) =>{
    e.preventDefault(); //! submitin default özelliği olarak, basıldığında sayfayı yenileyor. bunu önlemek için prevent default kullanıyoruz.
    getWeatherDataFromApi();
})

const getWeatherDataFromApi = () =>{
    // alert("http request sent");
    // input.value = ''; //?inputun içinde kalan yazıyı temizlemek için..

    //* bu aşamada API'ya istek gönderip veri alacağız. Bunun için fetch metodunu ya da Axios'u kullanacağız. Axios bir method değil bir pakettir. Fetch JS'in kendi methodudur. axios ise bir kütüphanedir.

    //*fetch ile işlem yapıldığında JSON ile gönderilip, alırsen JSON.parse yapmak gerekiyor. Ancak axios için bunları yapmaya gerek yok. alırken ve verirken kendisi otomatik JSON formatına dönüştürüyor.
    // axios kullanmak için HTML head'e script olarak link yazıyoruz.

    form.reset(); //!İnputun içini temizlemek için daha güzel bir yöntem. Form tag inin bir metodu.
}