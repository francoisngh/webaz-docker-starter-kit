# Projet Dan-que et François

Ce projet est un escape game composé de 4 items : une clé, un coffre et deux codes à quatre chiffres. La clé se trouve à Paris, le coffre à Lyon, le premier code à Montpellier et le dernier à Mantes-la-Jolie.

Notre projet est constitué d’un index PHP, d’un accueil avec le hall of fame, et de l’escape game en lui-même. Il est possible d’entrer un pseudo, et le score sous forme de chronomètre est enregistré dans le hall of fame à la fin de la partie. Le but est de récolter tous les items le plus rapidement possible. Il est préconisé de récupérer les items dans l'ordre prévu par le jeu, sauf si l’on connaît déjà les codes, auquel cas on peut directement aller déverrouiller le cadenas final.

Pour l’arborescence des fichiers, nous avons le code PHP, lié au code JS (qui fait appel aux autres assets comme les images et le CSS). Les items et les scores sont stockés dans la base de données SQL, à laquelle on accède depuis l’index via les routes Flight.

