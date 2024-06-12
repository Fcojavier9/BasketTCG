DO $$
BEGIN
    -- Check if all tables exist
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'usuarios'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'cartas'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'coleccion'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'mercado'
    ) THEN
        -- If all tables exist, do nothing
        RAISE NOTICE 'Las tablas ya existen';
    ELSEIF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name IN ('usuarios', 'cartas', 'coleccion', 'mercado')
    ) THEN
        -- If some tables exist but not all, there might be an issue
        RAISE NOTICE 'Algunas de las tablas ya existen, puede que la base de datos este corrupta, o estes usando una versión antigua de este script';
    ELSE
        -- If none of the tables exist, create them and add example data
        CREATE TABLE usuarios (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            name VARCHAR(255),
            password VARCHAR(70),
            saldo INTEGER DEFAULT 500,
            img_url VARCHAR(255),
            sobres INTEGER DEFAULT 5,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE cartas (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255),
            position VARCHAR(255) CHECK (position IN ('pg', 'sg', 'sf', 'pf', 'c')),
            rarity VARCHAR(255) CHECK (rarity IN ('comun', 'rara', 'heroe')),
            puntuacion SMALLINT,
            img_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE coleccion (
            id SERIAL PRIMARY KEY,
            id_usuario INTEGER REFERENCES usuarios(id),
            id_carta INTEGER REFERENCES cartas(id),
            cantidad INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE mercado (
            id SERIAL PRIMARY KEY,
            id_coleccion INT REFERENCES coleccion(id),
            precio INTEGER,
            vendida BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Add example data
        INSERT INTO usuarios (username, email, name, password, saldo, img_url, sobres, is_admin) VALUES
            ('admin', 'admin@basket.aetherdocks.xyz', 'Admin', '8ec98ed17b2fba4b6065111ab34427993f210e878414df557b31b443aacaa327', 8000, 'url1/usuarios/1.png', 10, true),
            ('test', 'test@basket.aetherdocks.xyz', 'Test', '8ec98ed17b2fba4b6065111ab34427993f210e878414df557b31b443aacaa327', 3000, 'img/usuarios/2.png', 10, false);

        INSERT INTO cartas (nombre, position, rarity, puntuacion, img_url) VALUES
            ('Darius Garland', 'pg', 'comun', 62, 'assets/cartas/1.png'),
            ('LaMelo Ball', 'pg', 'comun', 63, 'assets/cartas/2.png'),
            ('Kristaps Porzingis', 'pf', 'comun', 64, 'assets/cartas/3.png'),
            ('Jrue Holiday', 'pg', 'comun', 65, 'assets/cartas/4.png'),
            ('Khris Middleton', 'sf', 'comun', 66, 'assets/cartas/5.png'),
            ('CJ McCollum', 'sg', 'comun', 67, 'assets/cartas/6.png'),
            ('DeMar DeRozan', 'sf', 'comun', 68, 'assets/cartas/7.png'),
            ('Kyrie Irving', 'pg', 'comun', 69, 'assets/cartas/8.png'),
            ('Domantas Sabonis', 'pf', 'comun', 70, 'assets/cartas/9.png'),
            ('Julius Randle', 'pf', 'comun', 71, 'assets/cartas/10.png'),
            ('Brandon Ingram', 'sf', 'comun', 72, 'assets/cartas/11.png'),
            ('Bradley Beal', 'sg', 'comun', 73, 'assets/cartas/12.png'),
            ('Trae Young', 'pg', 'comun', 74, 'assets/cartas/13.png'),
            ('Karl-Anthony Towns', 'c', 'comun', 75, 'assets/cartas/14.png'),
            ('Zion Williamson', 'pf', 'comun', 76, 'assets/cartas/15.png'),
            ('Paul George', 'sf', 'comun', 77, 'assets/cartas/16.png'),
            ('Bam Adebayo', 'c', 'comun', 78, 'assets/cartas/17.png'),
            ('Jaylen Brown', 'sg', 'comun', 79, 'assets/cartas/18.png'),
            ('Pascal Siakam', 'pf', 'comun', 80, 'assets/cartas/19.png'),
            ('De''Aaron Fox', 'pg', 'comun', 81, 'assets/cartas/20.png'),
            ('Jalen Brunson', 'pg', 'comun', 82, 'assets/cartas/21.png'),
            ('Shai Gilgeous-Alexander', 'sg', 'comun', 83, 'assets/cartas/22.png'),
            ('Donovan Mitchell', 'sg', 'comun', 84, 'assets/cartas/23.png'),
            ('Devin Booker', 'sg', 'comun', 85, 'assets/cartas/24.png'),
            ('Damian Lillard', 'pg', 'rara', 86, 'assets/cartas/25.png'),
            ('Jimmy Butler', 'sf', 'rara', 87, 'assets/cartas/26.png'),
            ('Anthony Davis', 'pf', 'rara', 88, 'assets/cartas/27.png'),
            ('Ja Morant', 'pg', 'rara', 89, 'assets/cartas/28.png'),
            ('LeBron James', 'sf', 'rara', 90, 'assets/cartas/29.png'),
            ('Kevin Durant', 'sf', 'rara', 91, 'assets/cartas/30.png'),
            ('Stephen Curry', 'pg', 'rara', 92, 'assets/cartas/31.png'),
            ('Jayson Tatum', 'sf', 'rara', 93, 'assets/cartas/32.png'),
            ('Joel Embiid', 'c', 'rara', 94, 'assets/cartas/33.png'),
            ('Luka Doncic', 'pg', 'rara', 96, 'assets/cartas/34.png'),
            ('Giannis Antetokounmpo', 'pf', 'rara', 97, 'assets/cartas/35.png'),
            ('Nikola Jokic', 'c', 'rara', 97, 'assets/cartas/36.png'),
            ('Julius Erving', 'sf', 'heroe', 90, 'assets/cartas/37.png'),
            ('Oscar Robertson', 'pg', 'heroe', 91, 'assets/cartas/38.png'),
            ('Bill Russell', 'c', 'heroe', 92, 'assets/cartas/39.png'),
            ('Wilt Chamberlain', 'c', 'heroe', 93, 'assets/cartas/40.png'),
            ('Hakeem Olajuwon', 'c', 'heroe', 94, 'assets/cartas/41.png'),
            ('Kobe Bryant', 'sg', 'heroe', 95, 'assets/cartas/42.png'),
            ('Tim Duncan', 'pf', 'heroe', 95, 'assets/cartas/43.png'),
            ('Shaquille O''Neal', 'c', 'heroe', 96, 'assets/cartas/44.png'),
            ('Larry Bird', 'sf', 'heroe', 97, 'assets/cartas/45.png'),
            ('Magic Johnson', 'pg', 'heroe', 98, 'assets/cartas/46.png'),
            ('Kareem Abdul-Jabbar', 'c', 'heroe', 99, 'assets/cartas/47.png'),
            ('Michael Jordan', 'sg', 'heroe', 100, 'assets/cartas/48.png');

        INSERT INTO coleccion (id_usuario, id_carta, cantidad) VALUES
            (1, 1, 5),
            (1, 2, 2),
            (1, 3, 7),
            (1, 4, 2),
            (1, 5, 6),
            (1, 6, 5),
            (1, 7, 5),
            (1, 8, 10),
            (1, 9, 3),
            (1, 10, 2),
            (1, 11, 2),
            (1, 12, 9),
            (1, 13, 1),
            (1, 14, 6),
            (1, 15, 2),
            (1, 16, 6),
            (1, 17, 4),
            (1, 18, 2),
            (1, 19, 10),
            (1, 20, 6),
            (1, 21, 4),
            (1, 22, 5),
            (1, 23, 6),
            (1, 24, 6),
            (1, 25, 6),
            (1, 26, 1),
            (1, 27, 3),
            (1, 28, 6),
            (1, 29, 10),
            (1, 30, 4),
            (1, 31, 5),
            (1, 32, 8),
            (1, 33, 2),
            (1, 34, 8),
            (1, 35, 6),
            (1, 36, 5),
            (1, 37, 4),
            (1, 38, 1),
            (1, 39, 3),
            (1, 40, 7),
            (1, 41, 9),
            (1, 42, 7),
            (1, 43, 10),
            (1, 44, 4),
            (1, 45, 1),
            (1, 46, 8),
            (1, 47, 2),
            (1, 48, 5),
            (2, 1, 3),
            (2, 2, 1),
            (2, 3, 7),
            (2, 4, 2),
            (2, 5, 6),
            (2, 6, 5),
            (2, 7, 5),
            (2, 8, 10),
            (2, 9, 3),
            (2, 10, 2),
            (2, 11, 2),
            (2, 12, 0),
            (2, 13, 1),
            (2, 14, 3),
            (2, 15, 2),
            (2, 16, 4),
            (2, 17, 4),
            (2, 18, 2),
            (2, 19, 0),
            (2, 20, 2),
            (2, 21, 0),
            (2, 22, 0),
            (2, 23, 0),
            (2, 24, 0),
            (2, 25, 0),
            (2, 26, 1),
            (2, 27, 2),
            (2, 28, 0),
            (2, 29, 0),
            (2, 30, 0),
            (2, 31, 5),
            (2, 32, 0),
            (2, 33, 2),
            (2, 34, 0),
            (2, 35, 1),
            (2, 36, 1),
            (2, 37, 0),
            (2, 38, 1),
            (2, 39, 0),
            (2, 40, 2),
            (2, 41, 0),
            (2, 42, 1),
            (2, 43, 0),
            (2, 44, 0),
            (2, 45, 1),
            (2, 46, 0),
            (2, 47, 0),
            (2, 48, 0);

        INSERT INTO mercado (id_coleccion, precio, vendida) VALUES 
            (28, 225, false),
            (28, 230, false),
            (34, 300, false),
            (48, 2000, false),
            (49, 50, false),
            (49, 55, false),
            (50, 70, false),
            (59, 190, false);
        RAISE NOTICE 'Tablas creadas exitosamente';
    END IF;
END $$;