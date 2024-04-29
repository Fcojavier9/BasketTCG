# Este script genera aleatoriamente 100 entradas para la tabla coleccion.
# Es simplemente el código que se ha usado para generar script.sql.
# No es necesario usar este script, está aquí por si quieres ver cómo se ha generado el script.

import random

# Initialize the SQL script
sql_script = "INSERT INTO coleccion (id_usuario, id_carta, cantidad) VALUES\n"

# Generate 100 more entries
for i in range(100):
    # Generate random values
    id_usuario = random.randint(1, 20)
    id_carta = random.randint(1, 100)
    cantidad = random.randint(1, 10)
    
    # Add the entry to the SQL script
    sql_script += f"    ({id_usuario}, {id_carta}, {cantidad}),\n"

# Remove the last comma and add a semicolon
sql_script = sql_script[:-2] + ";"

print(sql_script)