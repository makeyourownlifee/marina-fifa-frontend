document.addEventListener("DOMContentLoaded", function() {
    const homeLink = document.getElementById('home-link');
    const tournamentGeneratorLink = document.getElementById('tournament-generator-link');
    const addResultLink = document.getElementById('add-result-link');
    
    const homeContent = document.getElementById('home-content');
    const tournamentGenerator = document.getElementById('tournament-generator');
    const addResult = document.getElementById('add-result');
    const tournamentList = document.getElementById('tournament-list');
    
    // Alapértelmezett menü: Kezdőlap
    showHomeContent();

    homeLink.addEventListener('click', showHomeContent);
    tournamentGeneratorLink.addEventListener('click', showTournamentGenerator);
    addResultLink.addEventListener('click', showAddResult);
    
    // Az összes bajnokság megjelenítése
    fetchTournaments();

    function fetchTournaments() {
        fetch('https://marina-fifa-api.onrender.com/api/tournaments')
            .then(response => response.json())
            .then(data => {
                tournamentList.innerHTML = '';
                data.forEach(tournament => {
                    const item = document.createElement('li');
                    item.textContent = `${tournament.name} (${tournament.year})`;
                    tournamentList.appendChild(item);
                });
            })
            .catch(error => {
                tournamentList.innerHTML = '<li>Hiba történt az adatok betöltésekor.</li>';
                console.error(error);
            });
    }

    // Bajonság generálás
    const generateForm = document.getElementById('generate-tournament-form');
    generateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('tournament-name').value;
        const year = document.getElementById('tournament-year').value;

        fetch('https://marina-fifa-api.onrender.com/api/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, year: year }),
        })
        .then(response => response.json())
        .then(data => {
            alert("Bajnokság sikeresen létrehozva!");
            fetchTournaments();
        })
        .catch(error => {
            alert("Hiba történt a bajnokság generálásakor.");
            console.error(error);
        });
    });

    // Eredmény felvitele
    const addResultForm = document.getElementById('add-result-form');
    addResultForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const team1Name = document.getElementById('team1-name').value;
        const team2Name = document.getElementById('team2-name').value;
        const team1Score = document.getElementById('team1-score').value;
        const team2Score = document.getElementById('team2-score').value;

        fetch('https://marina-fifa-api.onrender.com/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ team1Name, team2Name, team1Score, team2Score }),
        })
        .then(response => response.json())
        .then(data => {
            alert("Eredmény sikeresen felvéve!");
        })
        .catch(error => {
            alert("Hiba történt az eredmény felvitelénél.");
            console.error(error);
        });
    });

    function showHomeContent() {
        homeContent.style.display = 'block';
        tournamentGenerator.style.display = 'none';
        addResult.style.display = 'none';
    }

    function showTournamentGenerator() {
        homeContent.style.display = 'none';
        tournamentGenerator.style.display = 'block';
        addResult.style.display = 'none';
    }

    function showAddResult() {
        homeContent.style.display = 'none';
        tournamentGenerator.style.display = 'none';
        addResult.style.display = 'block';
    }
});
