Url = 'https://www.webqc.org/balance.php?reaction=H2SO4+%2B+Al+%3D+Al2(SO4)3+%2B+H23';

fetch(Url, {mode: 'cors', headers: {'Access-Control-Allow-Origin':'*'}})
  .then((response) => response.text())
  .then((data) => console.log(data));