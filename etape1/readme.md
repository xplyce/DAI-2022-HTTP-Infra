## Etape 1: Static HTTP server with apache httpd

### Dockerfile
Nous utilisons l'image php:7.2-apache disponible sur le docker hub. Le dockerfile 
va s'occuper de copier notre fichier src contenant le template bootstrap que nous 
avons choisi dans l'espace de travail du container(/var/www/html/).

```
FROM php:7.2-apache
COPY src/ /var/www/html/
```
### Création de l'image et lancement du container

```
docker build -t marko_nicolas/apache_php .
docker run -p 9090:80 marko_nicolas/apache_php
```
### Acces aux fichiers de la config apache

Le docker exec permet d'accéder au fichier du container.
Ensuite nous devons nous déplacer dans le /etc/apache2/sites-available 
pour trouver les fichiers de config.

```
docker exec -it name bin/bash 
cd etc/apache2/sites-available
```
