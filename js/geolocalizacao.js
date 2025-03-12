if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`);
          const data = await response.json();

          const cidade = data.address.city || data.address.town || data.address.village || "Cidade não encontrada";
          const bairro = data.address.suburb || data.address.neighbourhood || "Bairro não encontrado";
          const estado = data.address.state || "Estado não encontrado";
          
          // Siglas de estados brasileiros (mapa simples)
          const siglasEstados = {
            "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM",
            "Bahia": "BA", "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES",
            "Goiás": "GO", "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS",
            "Minas Gerais": "MG", "Pará": "PA", "Paraíba": "PB", "Paraná": "PR",
            "Pernambuco": "PE", "Piauí": "PI", "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN",
            "Rio Grande do Sul": "RS", "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC",
            "São Paulo": "SP", "Sergipe": "SE", "Tocantins": "TO"
          };

          const siglaEstado = siglasEstados[estado] || estado;

          document.getElementById('cidade-estado').textContent = `${cidade}, ${siglaEstado}`;
          document.getElementById('bairro').textContent = `${bairro}`;
        } catch (error) {
          document.getElementById('cidade-estado').textContent = 'Erro ao obter a localização.';
        }
      },
      (error) => {
        document.getElementById('cidade-estado').textContent = 'Permissão negada ou erro ao obter localização.';
      }
    );
  } else {
    document.getElementById('cidade-estado').textContent = 'Geolocalização não suportada.';
  }