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
            sobres INTEGER DEFAULT 0,
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
        INSERT INTO usuarios (username, email, name, password, saldo, img_url) VALUES
            ('fran', 'fran@email.es', 'FcoJavier9', '8ec98ed17b2fba4b6065111ab34427993f210e878414df557b31b443aacaa327', 100, 'url1/usuarios/1.jpg'),
            ('pablo', 'pablo@email.es', 'PabloNarVal', 'passwordhash2', 150, 'img/usuarios/2.jpg'),
            ('rafa', 'rafa@email.es', 'Rafa el guay', 'passwordhash3', 420, 'img/usuarios/3.jpg'),
            ('marc', 'marc@email.com', 'Marc spector', 'passwordhash4', 200, 'img/usuarios/4.jpg'),
            ('steven', 'steven@email.com', 'Steven Grant', 'passwordhash5', 250, 'img/usuarios/5.jpg'),
            ('mario', 'mario@email.com', 'Mario Mario', 'passwordhash6', 300, 'img/usuarios/6.jpg'),
            ('maurice', 'sonic@email.com', 'S. Maurice Hedgehog', 'passwordhash7', 350, 'img/usuarios/7.jpg'),
            ('Alec', 'wizard@email.com', 'Alec Azzam', 'passwordhash8', 400, 'img/usuarios/8.jpg'),
            ('bruce', 'bruce@email.com', 'Bruce Wayne', 'passwordhash9', 450, 'img/usuarios/9.jpg'),
            ('clark', 'clark@email.com', 'Clark Kent', 'passwordhash10', 500, 'img/usuarios/10.jpg'),
            ('peter', 'peter@email.com', 'Peter Parker', 'passwordhash11', 550, 'img/usuarios/11.jpg'),
            ('logan', 'logan@email.com', 'Logan Howlett', 'passwordhash12', 600, 'img/usuarios/12.jpg'),
            ('natasha', 'natasha@email.com', 'Natasha Romanoff', 'passwordhash13', 650, 'img/usuarios/13.jpg'),
            ('steve', 'steve@email.com', 'Steve Rogers', 'passwordhash14', 700, 'img/usuarios/14.jpg'),
            ('diana', 'diana@email.com', 'Diana Prince', 'passwordhash15', 750, 'img/usuarios/15.jpg'),
            ('barry', 'barry@email.com', 'Barry Allen', 'passwordhash16', 800, 'img/usuarios/16.jpg'),
            ('arthur', 'arthur@email.com', 'Arthur Curry', 'passwordhash17', 850, 'img/usuarios/17.jpg'),
            ('hal', 'hal@email.com', 'Hal Jordan', 'passwordhash18', 900, 'img/usuarios/18.jpg'),
            ('oliver', 'oliver@email.com', 'Oliver Queen', 'passwordhash19', 950, 'img/usuarios/19.jpg'),
            ('jake', 'jake@email.com', 'Jake Lockley', 'passwordhash20', 1000, 'img/usuarios/20.jpg');

        INSERT INTO cartas (nombre, position, rarity, puntuacion, img_url) VALUES
            ('LeBron James', 'pg', 'heroe', 99, 'img/carta/1.jpg'),
            ('Michael Jordan', 'sg', 'rara', 100, 'img/carta/2.jpg'),
            ('Kareem Abdul-Jabbar', 'c', 'heroe', 98, 'img/carta/3.jpg'),
            ('Magic Johnson', 'pg', 'rara', 97, 'img/carta/4.jpg'),
            ('Larry Bird', 'sf', 'comun', 96, 'img/carta/5.jpg'),
            ('Bill Russell', 'c', 'heroe', 95, 'img/carta/6.jpg'),
            ('Wilt Chamberlain', 'c', 'rara', 94, 'img/carta/7.jpg'),
            ('Shaquille O Neal', 'c', 'comun', 93, 'img/carta/8.jpg'),
            ('Tim Duncan', 'pf', 'heroe', 92, 'img/carta/9.jpg'),
            ('Hakeem Olajuwon', 'c', 'rara', 91, 'img/carta/10.jpg'),
            ('Oscar Robertson', 'pg', 'comun', 90, 'img/carta/11.jpg'),
            ('Karl Malone', 'pf', 'heroe', 89, 'img/carta/12.jpg'),
            ('Moses Malone', 'c', 'rara', 88, 'img/carta/13.jpg'),
            ('David Robinson', 'c', 'comun', 87, 'img/carta/14.jpg'),
            ('John Stockton', 'pg', 'heroe', 86, 'img/carta/15.jpg'),
            ('Patrick Ewing', 'c', 'rara', 85, 'img/carta/16.jpg'),
            ('Scottie Pippen', 'sf', 'comun', 84, 'img/carta/17.jpg'),
            ('Clyde Drexler', 'sg', 'heroe', 83, 'img/carta/18.jpg'),
            ('Charles Barkley', 'pf', 'rara', 82, 'img/carta/19.jpg'),
            ('Isiah Thomas', 'pg', 'comun', 81, 'img/carta/20.jpg'),
            ('Kevin McHale', 'pf', 'heroe', 80, 'img/carta/21.jpg'),
            ('Elgin Baylor', 'sf', 'rara', 79, 'img/carta/22.jpg'),
            ('George Gervin', 'sg', 'comun', 78, 'img/carta/23.jpg'),
            ('Dominique Wilkins', 'sf', 'heroe', 77, 'img/carta/24.jpg'),
            ('Gary Payton', 'pg', 'rara', 76, 'img/carta/25.jpg'),
            ('Dennis Rodman', 'pf', 'comun', 75, 'img/carta/26.jpg'),
            ('Bob Cousy', 'pg', 'heroe', 74, 'img/carta/27.jpg'),
            ('Bill Walton', 'c', 'rara', 73, 'img/carta/28.jpg'),
            ('James Worthy', 'sf', 'comun', 72, 'img/carta/29.jpg'),
            ('Robert Parish', 'c', 'heroe', 71, 'img/carta/30.jpg'),
            ('Jerry West', 'pg', 'rara', 70, 'img/carta/31.jpg'),
            ('Elvin Hayes', 'pf', 'comun', 69, 'img/carta/32.jpg'),
            ('Wes Unseld', 'c', 'heroe', 68, 'img/carta/33.jpg'),
            ('Rick Barry', 'sf', 'rara', 67, 'img/carta/34.jpg'),
            ('Bob Pettit', 'pf', 'comun', 66, 'img/carta/35.jpg'),
            ('Willis Reed', 'c', 'heroe', 65, 'img/carta/36.jpg'),
            ('Dave Cowens', 'c', 'rara', 64, 'img/carta/37.jpg'),
            ('Nate Thurmond', 'c', 'comun', 63, 'img/carta/38.jpg'),
            ('Pete Maravich', 'sg', 'heroe', 62, 'img/carta/39.jpg'),
            ('Bill Sharman', 'sg', 'rara', 61, 'img/carta/40.jpg'),
            ('Sam Jones', 'sg', 'comun', 60, 'img/carta/41.jpg'),
            ('George Mikan', 'c', 'heroe', 59, 'img/carta/42.jpg'),
            ('Dolph Schayes', 'pf', 'rara', 58, 'img/carta/43.jpg'),
            ('Paul Arizin', 'sf', 'comun', 57, 'img/carta/44.jpg'),
            ('Bob McAdoo', 'pf', 'heroe', 56, 'img/carta/45.jpg'),
            ('Artis Gilmore', 'c', 'rara', 55, 'img/carta/46.jpg'),
            ('Dave Bing', 'pg', 'comun', 54, 'img/carta/47.jpg'),
            ('Hal Greer', 'sg', 'heroe', 53, 'img/carta/48.jpg'),
            ('Tom Heinsohn', 'pf', 'rara', 52, 'img/carta/49.jpg'),
            ('Bill Bradley', 'sf', 'comun', 51, 'img/carta/50.jpg'),
            ('Walt Frazier', 'pg', 'heroe', 50, 'img/carta/51.jpg'),
            ('Earl Monroe', 'sg', 'rara', 49, 'img/carta/52.jpg'),
            ('Nate Archibald', 'pg', 'comun', 48, 'img/carta/53.jpg'),
            ('Jerry Lucas', 'pf', 'heroe', 47, 'img/carta/54.jpg'),
            ('Billy Cunningham', 'sf', 'rara', 46, 'img/carta/55.jpg'),
            ('Dave DeBusschere', 'pf', 'comun', 45, 'img/carta/56.jpg'),
            ('Connie Hawkins', 'sf', 'heroe', 44, 'img/carta/57.jpg'),
            ('Gail Goodrich', 'sg', 'rara', 43, 'img/carta/58.jpg'),
            ('Lenny Wilkens', 'pg', 'comun', 42, 'img/carta/59.jpg'),
            ('Walt Bellamy', 'c', 'heroe', 41, 'img/carta/60.jpg'),
            ('Elvin Hayes', 'pf', 'rara', 40, 'img/carta/61.jpg'),
            ('Adrian Dantley', 'sf', 'comun', 39, 'img/carta/62.jpg'),
            ('Alex English', 'sf', 'heroe', 38, 'img/carta/63.jpg'),
            ('Bernard King', 'sf', 'rara', 37, 'img/carta/64.jpg'),
            ('Chris Mullin', 'sg', 'comun', 36, 'img/carta/65.jpg'),
            ('Clyde Lovellette', 'c', 'heroe', 35, 'img/carta/66.jpg'),
            ('Dan Issel', 'c', 'rara', 34, 'img/carta/67.jpg'),
            ('David Thompson', 'sg', 'comun', 33, 'img/carta/68.jpg'),
            ('Dennis Johnson', 'sg', 'heroe', 32, 'img/carta/69.jpg'),
            ('Dick McGuire', 'pg', 'rara', 31, 'img/carta/70.jpg'),
            ('Ed Macauley', 'c', 'comun', 30, 'img/carta/71.jpg'),
            ('Frank Ramsey', 'sg', 'heroe', 29, 'img/carta/72.jpg'),
            ('George Yardley', 'sf', 'rara', 28, 'img/carta/73.jpg'),
            ('Gus Johnson', 'pf', 'comun', 27, 'img/carta/74.jpg'),
            ('Harry Gallatin', 'pf', 'heroe', 26, 'img/carta/75.jpg'),
            ('Jack Twyman', 'sf', 'rara', 25, 'img/carta/76.jpg'),
            ('Jim Pollard', 'sf', 'comun', 24, 'img/carta/77.jpg'),
            ('Joe Fulks', 'sf', 'heroe', 23, 'img/carta/78.jpg'),
            ('John Havlicek', 'sf', 'rara', 22, 'img/carta/79.jpg'),
            ('K.C. Jones', 'pg', 'comun', 21, 'img/carta/80.jpg'),
            ('Kevin Garnett', 'pf', 'heroe', 20, 'img/carta/81.jpg'),
            ('Larry Foust', 'c', 'rara', 19, 'img/carta/82.jpg'),
            ('Maurice Stokes', 'pf', 'comun', 18, 'img/carta/83.jpg'),
            ('Mel Hutchins', 'pf', 'heroe', 17, 'img/carta/84.jpg'),
            ('Neil Johnston', 'c', 'rara', 16, 'img/carta/85.jpg'),
            ('Paul Westphal', 'sg', 'comun', 15, 'img/carta/86.jpg'),
            ('Ralph Sampson', 'c', 'heroe', 14, 'img/carta/87.jpg'),
            ('Slater Martin', 'pg', 'rara', 13, 'img/carta/88.jpg'),
            ('Tom Gola', 'sf', 'comun', 12, 'img/carta/89.jpg'),
            ('Vern Mikkelsen', 'pf', 'heroe', 11, 'img/carta/90.jpg'),
            ('Wes Unseld', 'c', 'rara', 10, 'img/carta/91.jpg'),
            ('Willis Reed', 'c', 'comun', 9, 'img/carta/92.jpg'),
            ('Zelmo Beaty', 'c', 'heroe', 8, 'img/carta/93.jpg'),
            ('Arnie Risen', 'c', 'rara', 7, 'img/carta/94.jpg'),
            ('Bailey Howell', 'sf', 'comun', 6, 'img/carta/95.jpg'),
            ('Bill Sharman', 'sg', 'heroe', 5, 'img/carta/96.jpg'),
            ('Bob Davies', 'pg', 'rara', 4, 'img/carta/97.jpg'),
            ('Bobby Wanzer', 'sg', 'comun', 3, 'img/carta/98.jpg'),
            ('Cliff Hagan', 'sf', 'heroe', 2, 'img/carta/99.jpg'),
            ('Dolph Schayes', 'pf', 'rara', 1, 'img/carta/100.jpg');
    

        INSERT INTO coleccion (id_usuario, id_carta, cantidad) VALUES
            (9, 85, 5),
            (9, 69, 2),
            (18, 61, 7),
            (5, 30, 2),
            (13, 96, 6),
            (16, 93, 5),
            (1, 99, 5),
            (18, 89, 10),
            (3, 81, 3),
            (7, 6, 2),
            (6, 63, 2),
            (13, 33, 9),
            (15, 16, 1),
            (13, 66, 6),
            (4, 28, 2),
            (12, 3, 6),
            (8, 100, 4),
            (4, 73, 2),
            (20, 15, 10),
            (1, 51, 6),
            (3, 44, 4),
            (19, 1, 5),
            (3, 74, 6),
            (10, 60, 6),
            (8, 95, 6),
            (10, 45, 1),
            (18, 4, 3),
            (6, 98, 7),
            (12, 84, 10),
            (20, 15, 4),
            (3, 69, 5),
            (20, 31, 8),
            (15, 42, 2),
            (12, 26, 9),
            (3, 53, 6),
            (9, 19, 5),
            (12, 15, 4),
            (15, 20, 1),
            (4, 56, 3),
            (20, 53, 7),
            (13, 29, 9),
            (15, 63, 7),
            (20, 55, 10),
            (4, 85, 4),
            (18, 82, 1),
            (20, 18, 8),
            (17, 91, 2),
            (13, 49, 6),
            (17, 27, 2),
            (13, 7, 9),
            (2, 98, 10),
            (20, 3, 7),
            (19, 49, 1),
            (20, 13, 3),
            (14, 3, 9),
            (18, 94, 10),
            (18, 10, 9),
            (10, 81, 10),
            (19, 59, 7),
            (5, 34, 7),
            (20, 15, 5),
            (10, 48, 1),
            (9, 26, 7),
            (12, 77, 5),
            (19, 53, 7),
            (7, 35, 7),
            (1, 30, 6),
            (11, 43, 2),
            (15, 4, 10),
            (5, 71, 6),
            (2, 47, 1),
            (20, 44, 2),
            (18, 79, 9),
            (17, 89, 7),
            (8, 85, 10),
            (15, 90, 1),
            (13, 75, 6),
            (14, 83, 4),
            (14, 47, 4),
            (12, 18, 5),
            (11, 44, 3),
            (3, 36, 4),
            (11, 61, 8),
            (18, 87, 3),
            (19, 65, 4),
            (4, 79, 2),
            (4, 26, 10),
            (19, 25, 5),
            (10, 37, 6),
            (9, 42, 4),
            (12, 21, 2),
            (8, 3, 1),
            (3, 84, 9),
            (3, 75, 2),
            (14, 95, 4),
            (12, 5, 8),
            (3, 27, 2),
            (14, 55, 4),
            (2, 29, 2),
            (12, 75, 10);

        INSERT INTO mercado (id_coleccion, precio, vendida) VALUES
            (55, 78, True),
            (61, 63, False),
            (46, 24, False),
            (47, 47, True),
            (65, 68, True),
            (66, 16, False),
            (21, 41, True),
            (54, 84, True),
            (8, 33, False),
            (63, 15, False),
            (25, 69, False),
            (25, 13, False),
            (93, 43, True),
            (57, 11, True),
            (3, 59, True),
            (78, 88, True),
            (54, 96, True),
            (77, 23, False),
            (22, 53, False),
            (33, 53, False),
            (97, 58, True),
            (48, 44, True),
            (45, 10, True),
            (54, 29, False),
            (33, 62, True),
            (14, 19, True),
            (42, 35, True),
            (99, 13, True),
            (11, 98, False),
            (33, 98, True),
            (63, 13, False),
            (27, 14, True),
            (20, 29, True),
            (100, 87, False),
            (58, 68, False),
            (29, 17, True),
            (83, 45, True),
            (61, 39, True),
            (83, 99, False),
            (15, 39, True),
            (26, 39, True),
            (43, 91, True),
            (33, 16, True),
            (90, 81, True),
            (100, 67, False),
            (88, 14, True),
            (60, 14, True),
            (50, 40, True),
            (73, 14, True),
            (80, 12, True),
            (53, 64, True),
            (85, 12, True),
            (9, 87, True),
            (55, 35, True),
            (11, 89, True),
            (15, 26, False),
            (57, 55, True),
            (9, 11, True),
            (60, 58, True),
            (52, 98, False),
            (28, 82, True),
            (5, 11, True),
            (31, 48, False),
            (7, 70, True),
            (55, 20, True),
            (15, 39, True),
            (17, 10, True),
            (1, 98, False),
            (7, 97, False),
            (32, 11, True),
            (70, 26, True),
            (72, 83, True),
            (86, 22, True),
            (65, 98, True),
            (37, 18, True),
            (53, 76, True),
            (17, 56, False),
            (9, 41, True),
            (49, 79, True),
            (31, 94, True),
            (100, 71, True),
            (43, 83, True),
            (67, 42, True),
            (4, 67, False),
            (86, 21, True),
            (21, 57, True),
            (13, 71, True),
            (37, 60, True),
            (28, 12, True),
            (56, 54, False),
            (1, 90, True),
            (85, 51, True),
            (23, 38, True),
            (92, 100, True),
            (61, 56, True),
            (12, 98, False),
            (9, 90, False),
            (83, 54, True),
            (41, 37, False),
            (71, 54, True);

        RAISE NOTICE 'Tablas creadas exitosamente';
    END IF;
END $$;