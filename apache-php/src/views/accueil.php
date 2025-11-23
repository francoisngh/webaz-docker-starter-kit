<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <p>L'escape game assez simple</p>
    <ul>
        <li><a href="/map" title="lien"> page carte </a></li>
    </ul>

    <h2>Hall of Fame</h2>
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