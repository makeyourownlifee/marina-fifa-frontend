fetch('https://marina-fifa-api.onrender.com/api/tournaments')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('tournament-list');
    data.forEach(tournament => {
      const item = document.createElement('li');
      item.textContent = `${tournament.name} (${tournament.year})`;
      list.appendChild(item);
    });
  })
  .catch(error => {
    const list = document.getElementById('tournament-list');
    list.innerHTML = '<li>Hiba történt az adatok betöltésekor.</li>';
    console.error(error);
  });
