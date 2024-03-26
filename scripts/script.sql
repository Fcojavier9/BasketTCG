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
            vendida BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Add example data
        INSERT INTO usuarios (username, email,name, password, saldo, img_url) VALUES
            ('fran', 'fran@email.es', 'User One', 'passwordhash1', 100, 'url1/usuarios/1.jpg'),
            ('pablo', 'pablo@email.es', 'User Two', 'passwordhash2', 150, 'img/usuarios/2.jpg'),
            ('rafa', 'rafa@email.es', 'Rafa el guay', 'passwordhash3', 62, 'img/usuarios/3.jpg');

        INSERT INTO cartas (nombre, position, rarity, puntuacion, img_url) VALUES
            ('LeBron James', 'pg', 'heroe', 99, 'img/carta/1.jpg'),
            ('Michael Jordan', 'sg', 'rara', 100, 'img/carta/2.jpg');

        INSERT INTO coleccion (id_usuario, id_carta, cantidad) VALUES
            (1, 1, 3),
            (1, 2, 1),
            (2, 2, 2);

        INSERT INTO mercado (id_coleccion, vendida) VALUES
            (1, FALSE),
            (2, TRUE);

        RAISE NOTICE 'Tablas creadas exitosamente';
    END IF;
END $$;