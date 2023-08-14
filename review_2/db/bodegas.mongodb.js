use("db_bodegas_campus");

db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "usuarios object validation",
      required: ["nombre", "email", "password", "estado"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre del usuario debe ser string y es obligatorio"
        },
        email: {
          bsonType: "string",
          description: "Correo electrónico del usuario debe ser string y es obligatorio"
        },
        email_verifed_at: {
          bsonType: "string",
          description: "Fecha de verificación de correo electrónico del usuario (opcional)"
        },
        foto: {
          bsonType: "string",
          description: "URL de la foto del usuario (opcional)"
        },
        password: {
          bsonType: "int",
          description: "Contraseña del usuario debe ser string y es obligatorio"
        },
        estado: {
          bsonType: "number",
          minimum: 0,
          maximum: 4,
          description: "Estado del usuario (0 = inactivo, 1 = activo)"
        },
        created_by: {
          bsonType: "string",
          description: "ID del usuario creador (opcional)"
        },
        updated_by: {
          bsonType: "string",
          description: "ID del usuario actualizador (opcional)"
        },
        created_at: {
          bsonType: "string",
          description: "Fecha de creación del usuario"
        },
        updated_at: {
          bsonType: "string",
          description: "Fecha de actualización del usuario (opcional)"
        },
        deleted_at: {
          bsonType: "string",
          description: "Fecha de eliminación del usuario (opcional)"
        }
      }
    }
  }
});


use("db_bodegas_campus");

db.usuarios.insertMany([
  {
    "id": 11,
    "nombre": "juan0",
    "email": "juan 0@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 12,
    "nombre": "juan1",
    "email": "juan 1@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 13,
    "nombre": "juan2",
    "email": "juan 2@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 14,
    "nombre": "juan3",
    "email": "juan 3@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 15,
    "nombre": "juan4",
    "email": "juan 4@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 16,
    "nombre": "juan5",
    "email": "juan 5@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 17,
    "nombre": "juan6",
    "email": "juan 6@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 18,
    "nombre": "juan7",
    "email": "juan 7@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 19,
    "nombre": "juan8",
    "email": "juan 8@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  },
  {
    "id": 20,
    "nombre": "juan9",
    "email": "juan 9@hotmail.com",
    "email_verifed_at": "NULL",
    "foto": "NULL",
    "password": 12345,
    "estado": 1,
    "created_by": "NULL",
    "updated_by": "NULL",
    "created_at": "NULL",
    "updated_at": "NULL",
    "deleted_at": "NULL"
  }
])