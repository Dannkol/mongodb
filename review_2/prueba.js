static async transladoProductos ({ object, object2 }) {
  const db = await connect()
  const session = client.startSession() // inicia una nueva sesion en la bd
  try {
    session.startTransaction() // inicia una transaccion en la sesion

    // A partir de este punto, todas las operaciones dentro de este bloque formarán parte de la misma transacción.
    const inventarios = db.collection('inventarios')
    const historiales = db.collection('historiales')

    const inventarioOrigen = await inventarios.findOneAndUpdate(
      { id_producto: object.idProducto, id_bodega: object.idBodegaOrigen, cantidad: { $gte: object.cantidad } },
      { $inc: { cantidad: -object.cantidad } },
      { session, returnOriginal: false }
    )

    if (inventarioOrigen.value) {
      const inventarioDestino = await inventarios.findOneAndUpdate(
        {
          id_producto: object.idProducto,
          id_bodega: object.idBodegaDestino
        },
        { $inc: { cantidad: object.cantidad } },
        { session, returnOriginal: false }
      )

      if (inventarioDestino.value) {
        const historial = {
          id_bodega_origen: object2.idBodegaOrigen,
          id_bodega_destino: object2.idBodegaDestino,
          cantidad: object2.cantidad,
          id_inventario: inventarioOrigen.value._id
        }

        const result = await historiales.insertOne(historial, { session })

        await session.commitTransaction() // Confirma la transacción.
        session.endSession() // cierra la sesion

        const { insertedId } = result

        return { insertedId, message: 'Transaccion exitosa' }
      } else {
        await session.abortTransaction()
        session.endSession()

        return 'No se pudo actualizar inventario destino'
      }
    } else {
      await session.abortTransaction() // Revoca la transacción en caso de algún error.
      session.endSession() // Finaliza la sesión en caso de error.

      return 'No se pudo actualizar inventario origen o no hay suficiente stock'
    }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    return 'Error durante la transacción'
  } finally {
    await closeConnection()
  }
}