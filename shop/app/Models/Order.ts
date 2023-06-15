import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'


export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"user_id"})
  public userId: number

  public total: number

  @column({serializeAs:"payment_id"})
  public paymentId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>


}
