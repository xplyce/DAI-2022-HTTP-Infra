//changer le port 9090 si on veut executer plusieurs fois la même image
docker run -p 9090:80 marko_nicolas/apache_php

docker ps //pour avoir le nom

docker kill <name>

-----------------------------
  
-d permet de lancer la commande en arrière plan

-----------------------------

docker run -it name bin/bash permet d'accéder au container
exit pour quitter le container
cd /etc ... //apache config 

liens utiles :
https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04-fr
