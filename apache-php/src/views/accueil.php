<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="../assets/css/accueil.css">
</head>
<body>
    <h1>L'escape game assez simple de François et Ðan Quê</h1>

    <div style="text-align:center; margin-top:20px;">
        <a href="/map" class="btn">Jouer</a>
    </div>


    <h2>Halle de la notoriété</h2>
    <table id="hall-of-fame">
        <thead>
            <tr>
                <th>Rang</th>
                <th>Pseudo</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <!-- Rempli dynamiquement avec JS -->
        </tbody>
    </table>

    <script>
        fetch('/hall-of-fame')
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#hall-of-fame tbody');
            tbody.innerHTML = '';
            data.forEach((entry, i) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${i+1}</td><td>${entry.pseudo}</td><td>${entry.score}</td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error('Erreur récupération Hall of Fame:', err));
    </script>

</body>
</html>