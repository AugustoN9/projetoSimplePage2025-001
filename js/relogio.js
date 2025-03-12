window.addEventListener('load', ()=> {
    let horaHTML = document.getElementById('hora')
    let minutoHTML = document.getElementById('minuto')
    let segundoHTML = document.getElementById('segundo')
    let diaHTML = document.getElementById('dia')
    let mesHTML = document.getElementById('mes')
    let anoHTML = document.getElementById('ano')
    //let diaDaSemanaHTML = document.getElementById('diaDaSemana')

     const mostrarHoraData = () => {
         let fecha = new Date()
         let hora = fecha.getHours()
         let minuto = fecha.getMinutes()
         let segundo = fecha.getSeconds()
         let dia = fecha.getDate()
         let mes = fecha.getMonth()
         let ano = fecha.getFullYear()
         const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
         //const diasSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

         horaHTML.textContent =  String(hora).padStart(2, "0");
         minutoHTML.textContent = String(minuto).padStart(2, "0");
         segundoHTML.textContent = String(segundo).padStart(2, "0");
         diaHTML.textContent =  String(dia).padStart(2, "0");
         
         mesHTML.textContent = meses[String(mes)];
         anoHTML.textContent = String(ano);

         //diaDaSemanaHTML = diasSemana[String(dia)].textContent

         

         //setTimeout(mostrarHoraData, 1000)
         setInterval(mostrarHoraData, 500);
     };

     mostrarHoraData();
     //setInterval(mostrarHoraData, 1000);
})