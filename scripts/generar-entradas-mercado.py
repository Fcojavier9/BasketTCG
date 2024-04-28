# Este script genera aleatoriamente 100 entradas para la tabla mercado.
# Es simplemente el código que se ha usado para generar script.sql.
# No es necesario usar este script, está aquí por si quieres ver cómo se ha generado el script.

import random

# Initialize the SQL script
sql_script = "INSERT INTO mercado (id_coleccion, precio, vendida) VALUES\n"

# Generate 100 entries
for i in range(100):
    # Generate random values
    id_coleccion = random.randint(1, 100)
    precio = random.randint(10, 100)
    
    # Generate a random boolean value with a 75% chance of being TRUE
    vendida = random.choices([True, False], weights=[75, 25], k=1)[0]
    
    # Add the entry to the SQL script
    sql_script += f"    ({id_coleccion}, {precio}, {vendida}),\n"

# Remove the last comma and add a semicolon
sql_script = sql_script[:-2] + ";"

print(sql_script)