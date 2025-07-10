// Função para formatar números com separadores de milhar
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Função para converter números para extenso em português
function numberToWords(num) {
  const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const tens = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const hundreds = [
    '',
    'cento',
    'duzentos',
    'trezentos',
    'quatrocentos',
    'quinhentos',
    'seiscentos',
    'setecentos',
    'oitocentos',
    'novecentos'
  ];

  if (num === 0) return 'zero';

  let words = [];
  const numStr = num.toString().padStart(9, '0');

  // Milhões
  const millions = parseInt(numStr.substr(0, 3));
  if (millions > 0) {
    if (millions === 1) {
      words.push('um milhão');
    } else {
      words.push(convertThreeDigits(millions) + ' milhões');
    }
  }

  // Milhares
  const thousands = parseInt(numStr.substr(3, 3));
  if (thousands > 0) {
    words.push(convertThreeDigits(thousands) + ' mil');
  }

  // Restante
  const remainder = parseInt(numStr.substr(6, 3));
  if (remainder > 0 || num === 0) {
    words.push(convertThreeDigits(remainder));
  }

  return words.join(' ').trim();

  // Função auxiliar para converter três dígitos
  function convertThreeDigits(n) {
    let parts = [];
    if (n >= 100) {
      parts.push(hundreds[Math.floor(n / 100)]);
      n %= 100;
    }

    if (n >= 20) {
      parts.push(tens[Math.floor(n / 10)]);
      n %= 10;
    } else if (n >= 10) {
      parts.push(teens[n - 10]);
      n = 0;
    }

    if (n > 0) {
      parts.push(units[n]);
    }

    return parts.join(' e ');
  }
}

// Função principal para calcular o combustível
function calculateFuel(distance, cargo) {
  return distance * cargo * 5;
}

// Função para atualizar a interface com os resultados
function updateResults() {
  const distance = parseFloat(document.getElementById('distance').value) || 0;
  const cargo = parseFloat(document.getElementById('cargo').value) || 0;

  const fuel = calculateFuel(distance, cargo);
  const fuelFormatted = formatNumber(fuel);
  const fuelInWords = numberToWords(fuel);

  document.getElementById('calculation').innerHTML = `
        <p>Cálculo: ${formatNumber(distance)} milhões de km × ${formatNumber(
    cargo
  )} toneladas × 5L = ${fuelFormatted}L</p>
    `;

  document.getElementById('result').innerHTML = `
        <p>Total de combustível necessário: <span style="color: #ff8c00">${fuelFormatted} litros</span></p>
        <p>(${fuelInWords} litros)</p>
    `;

  // Mostra o container de resultados (caso estivesse escondido)
  document.querySelector('.result-container').style.display = 'block';
}

// Event listeners
document.getElementById('calculate').addEventListener('click', updateResults);
document.getElementById('back').addEventListener('click', () => {
  document.getElementById('distance').value = '225';
  document.getElementById('cargo').value = '3500';
  document.getElementById('calculation').innerHTML = '';
  document.getElementById('result').innerHTML = '';
  // Opcional: esconder o container de resultados ao voltar
  document.querySelector('.result-container').style.display = 'none';
});

// Inicialização - Esconde o resultado inicialmente
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.result-container').style.display = 'none';
});
