# Diagrama relacional de la base de datos


```dbml
Enum tipo_tarea {
  opciones
  booleano
  numerico
}

Table Medico {
  id int [pk, increment]
  nombre varchar(100) [not null]
  usuario varchar(100) [not null, unique]
  contrasegna varchar(100) [not null]
  esadmin boolean [not null, default: false]
} 

Table Paciente {
  numhist int [pk]
  nombre varchar(100) [not null]
  sexo boolean [not null]
} 

Table Via {
  id int [pk, increment]
  nombre varchar(100) [not null]
} 

Table Fase {
  id int [pk, increment]
  nombre varchar(100) [not null]
  idvia int [not null, ref: > Via.id]
} 

Table Tarea {
  id int [pk, increment]
  descripcion varchar(200) [not null]
  id_fase int [not null, ref: > Fase.id]
  tipo tipo_tarea [not null, default: 'booleano']
} 

Table Opcion_tarea {
  id int [pk, increment]
  descripcion varchar(100) [not null]
  id_tarea int [not null, ref: > Tarea.id]
} 

Table Etiqueta {
  id int [pk, increment]
  nombre varchar(100) [not null]
  idvia int [not null, ref: > Via.id]
}

Table Operacion {
  id int [pk, increment]
  indice double
  edad int [not null]
  fecha date [not null]
  etiqueta int [not null, ref: > Etiqueta.id]
  idvia int [not null, ref: > Via.id]
  numhist int [not null, ref: > Paciente.numhist]
}

Table Medico_de_paciente {
  numhist int [not null, ref: > Paciente.numhist]
  idmedico int [not null, ref: > Medico.id]
  
  indexes {
    (idmedico, numhist) [pk]
  }
}

Table Tarea_operacion {
  idtarea int [not null, ref: > Tarea.id]
  idoperacion int [not null, ref: > Operacion.id]
  completada boolean
  opcion int [ref: > Opcion_tarea.id]
  valor int
  
  indexes {
    (idtarea, idoperacion) [pk]
  }
}
```