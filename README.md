# BasketTCG
Proyecto fin de grado de Desarrollo de Aplicaciones Web

# Desarrollado por:
 - Francisco Javier Montiel Noguera
 - Pablo Navarro Valverde
 - Rafael Dominguez Alcolea

# Construir docker:
 - docker-compose build

# montar/desmontar docker:
 - docker-compose up
 - docker-compose down
 
# entrar en BBDD, en nueva terminal:
 - docker-compose ps -> listamos contenedores activos
 - docker exec -it "id_contenedor_o_nombre" bash
 - psql -U "usuario" --password -> entramos a la bbdd con el usuario y nos pedira contraseña
 - \l listamos todas las tablas
 - \q salimos de la bbdd
 - ctrl + d nos salimos del bash del contenedor de postgres