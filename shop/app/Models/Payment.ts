import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Orderdetail from './Order'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"order_id"})
  public orderId: number

  public amount: number

  public provider:string

  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Orderdetail, {
    foreignKey: 'orderId',
  })

  public order: BelongsTo<typeof Orderdetail>
}
