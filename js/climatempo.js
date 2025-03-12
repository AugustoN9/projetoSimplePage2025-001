window.addEventListener('load', ()=> {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescricao = document.getElementById('temperatura-descricao')  
    
    let localizacao = document.getElementById('localizacao')  
    let iconAnimado = document.getElementById('icon-animado') 

    let ventoVelocidade = document.getElementById('vento-velocidade') 


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           //console.log(posicion.coords.latitude)
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
            //ubicación actual    
           const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=f9774a623ec09e657534a382cc410207`

           //ubicación por ciudad
           //const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=${58424e1eb41f4c23337dd615196a3755}`

           console.log(url)

           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                //console.log(data)
                
                let temp = Math.round(data.main.temp)
                temp = (temp - 273.15)
                //console.log(temp)
                temperaturaValor.textContent = `${temp.toFixed(1)} ° C`

                //console.log(data.weather[0].description)
                let desc = data.weather[0].description
                temperaturaDescricao.textContent = desc.toUpperCase()
                localizacao.textContent = data.name
                
                ventoVelocidade.textContent = `${data.wind.speed} m/s`
                
                //para iconos estáticos
                //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`                     
                //icono.src = urlIcon
                //console.log(data.weather[0].icon)

                //para iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconAnimado.src='./animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconAnimado.src='./animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconAnimado.src='./animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconAnimado.src='./animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconAnimado.src='./animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                        iconAnimado.src='./animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconAnimado.src='./animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                        iconAnimado.src='./animated/cloudy-day-1.svg'
                        console.log('por defecto');
                  }

            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})