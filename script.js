const key = "9efbb86a8ddba85c987d24657fd1a2d6";



function screen(dados) {
  if (dados.cod === 200) {
    document.querySelector(".city").innerHTML = dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    const imgPrevisao = document.querySelector(".img-previsao");
    imgPrevisao.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    imgPrevisao.onerror = function() {
      // Oculta a imagem caso ocorra um erro ao carregar
      imgPrevisao.style.display = "none";
    };
    document.querySelector(".previsão").innerHTML = dados.weather[0].description;
    document.querySelector(".humidity").innerHTML = `Umidade: ${dados.main.humidity}%`;
  } else {
    document.querySelector(".city").innerHTML = "Cidade não encontrada";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".img-previsao").src = "";
    document.querySelector(".previsão").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
  }
}

async function searchCity(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    );
    const dados = await response.json();

    screen(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    document.querySelector(".city").innerHTML = "Ocorreu um erro ao buscar os dados";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".img-previsao").src = "";
    document.querySelector(".previsão").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
  }

    document.querySelector("input").value = "";
}

const input = document.querySelector('input');

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    
    searchCity(input.value.trim());
  }
});
function search() {
  const city = document.querySelector("input").value.trim();

  if (city === "") {
    alert("Por favor, insira o nome da cidade");
    return;
  }

  searchCity(city);
}
