import { MongoClient } from "mongodb";


const uri = 'mongodb+srv://Dannkol:diminombre12A@pruebas.ncnxgtj.mongodb.net/'; // Cambia la URI de acuerdo a tu configuración
const dbName = 'db_alquiler_campus';

(async () => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);

    let fecha_inicio = new Date('2023-08-05T12:30:00');
    let fecha_fin = new Date('2023-08-10T12:30:00');

    const idCliente2 = await db.collection('cliente').findOne({ nombre: 'Marta' })._id;
    const idCliente3 = await db.collection('cliente').findOne({ nombre: 'Luz' })._id;

    const tiempoAlquiler = fecha_fin - fecha_inicio;

    const idAutomovil_Marca1 = await db.collection('automovil').findOne({ marca: 'marca1' }, { projection: { _id: 1, precio_diario: 1 } });
    const idAutomovil_Marca2 = await db.collection('automovil').findOne({ marca: 'marca2' }, { projection: { _id: 1, precio_diario: 1 } });

    const alquilerData = [
      {
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        costo_total: (tiempoAlquiler / (1000 * 60 * 60 * 24)) * idAutomovil_Marca1.precio_diario,
        estado: 'Disponible',
        id_cliente: idCliente2,
        id_automovil: idAutomovil_Marca1._id,
      },
      {
        fecha_inicio: new Date('2023-08-01T12:30:00'),
        fecha_fin: new Date('2023-08-10T12:30:00'),
        costo_total: ((new Date('2023-08-01T12:30:00') - new Date('2023-08-10T12:30:00')) / (1000 * 60 * 60 * 24)) * idAutomovil_Marca2.precio_diario,
        estado: 'Alquilado',
        id_cliente: idCliente3,
        id_automovil: idAutomovil_Marca2._id,
      },
    ];

    const result = await db.collection('alquiler').insertMany(alquilerData);
    console.log('Documentos insertados:', result.insertedCount);
  } catch (error) {
    console.error('Error:', error.writeErrors[0].err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details);
  } finally {
    client.close();
  }
})();
