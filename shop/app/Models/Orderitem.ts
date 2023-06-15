import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'

export default class Orderitem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"order_id"})
  public orderId: number

  @column({serializeAs:"product_id"})
  public productId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  public order: BelongsTo<typeof Order>
}
