
CREATE TYPE tipo_tarea AS ENUM ('opciones', 'booleano', 'numerico');

CREATE TABLE medico (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasegna VARCHAR(100) NOT NULL,
    esadmin BOOLEAN NOT NULL DEFAULT false
    
);

CREATE TABLE paciente (
    numhist INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    sexo BOOLEAN NOT NULL
   
);

CREATE TABLE via (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fase (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    idvia INT NOT NULL,
    FOREIGN KEY (idvia) REFERENCES via(id) ON DELETE CASCADE
);

CREATE TABLE tarea (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(200) NOT NULL,
    id_fase INT NOT NULL,
    tipo tipo_tarea NOT NULL DEFAULT 'booleano',
    FOREIGN KEY (id_fase) REFERENCES fase(id) ON DELETE CASCADE
);

CREATE TABLE opcion_tarea (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    id_tarea INT NOT NULL,
    FOREIGN KEY (id_tarea) REFERENCES tarea(id) ON DELETE CASCADE
);

CREATE TABLE etiqueta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    idvia INT NOT NULL,
    FOREIGN KEY (idvia) REFERENCES via(id) ON DELETE CASCADE
);

CREATE TABLE operacion (
    id SERIAL PRIMARY KEY,
    indice double precision, 
    edad INT NOT NULL,
    fecha DATE NOT NULL,
    etiqueta INT NOT NULL,
    idvia INT NOT NULL,
    numhist INT NOT NULL,
    FOREIGN KEY (numhist) REFERENCES paciente(numhist) ON DELETE CASCADE,
    FOREIGN KEY (idvia) REFERENCES via(id) ON DELETE CASCADE,
    FOREIGN KEY (etiqueta) REFERENCES etiqueta(id) ON DELETE CASCADE
);



CREATE TABLE medico_de_paciente (
    idmedico INT NOT NULL,
    numhist INT NOT NULL,
    FOREIGN KEY (idmedico) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (numhist) REFERENCES paciente(numhist) ON DELETE CASCADE,
    PRIMARY KEY (idmedico, numhist)
);

CREATE TABLE tarea_operacion (
    idtarea INT NOT NULL,
    idoperacion INT NOT NULL,
    completada BOOLEAN,
    opcion INT ,
    valor INT,
    FOREIGN KEY (idtarea) REFERENCES tarea(id) ON DELETE CASCADE,
    FOREIGN KEY (idoperacion) REFERENCES operacion(id) ON DELETE CASCADE,
    FOREIGN KEY (opcion) REFERENCES opcion_tarea(id) ON DELETE CASCADE,
    PRIMARY KEY (idtarea, idoperacion)
);



INSERT INTO via ( nombre) VALUES ( 'Rodilla');
INSERT INTO via ( nombre) VALUES ( 'Cadera');


-- INSERT INTO fase ( nombre, idvia) VALUES ( 'Preingreso', 1);
-- INSERT INTO fase ( nombre, idvia) VALUES ( 'Preingreso', 2);
-- INSERT INTO tarea ( descripcion, id_fase) VALUES ( 'Realización de radiografías y telemétricas', 1);
-- INSERT INTO tarea ( descripcion, id_fase) VALUES ( 'Realización de radiografías y telemétricas', 2);
-- INSERT INTO fase ( nombre, idvia) VALUES ( 'Pre-Intervención Quirúrgica', 1);
-- INSERT INTO tarea ( descripcion, id_fase) VALUES ( 'Comprobación de la valoración por anestesia y petición de anestesia intrahospitalaria', 3);
-- INSERT INTO paciente (numhist, nombre, sexo) VALUES (111111, 'Juan Pérez', true);
-- INSERT INTO tarea_operacion (idtarea, idoperacion, completada, opcion) VALUES (1, 1, true, null);




-- CREATE TABLE operacion_paciente (
--     idoperacion INT NOT NULL,
--     numhist INT NOT NULL,
--     FOREIGN KEY (idoperacion) REFERENCES operacion(id) ON DELETE CASCADE,
--     FOREIGN KEY (numhist) REFERENCES paciente(numhist) ON DELETE CASCADE,
--     PRIMARY KEY (idoperacion, numhist)
-- );
