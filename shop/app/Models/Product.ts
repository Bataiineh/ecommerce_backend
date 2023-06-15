import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Discount from './Discount'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"product_name"})
  public productName: string

  @column({serializeAs:"price"})
  public price: number

  @column({serializeAs:"category_id"})
  public categoryId: number


  @column({serializeAs:"discount_id"})
  public discountId: number

  @column({serializeAs:"image_url"})
  public imageUrl: string

  @column({serializeAs:"description"})
  public description: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Discount, {
    foreignKey: 'discountId',
  })

  public discount: BelongsTo<typeof Discount>

  @belongsTo(() => Category, {
    foreignKey: 'categoryId' ,
  })

  public category: BelongsTo<typeof Category>
}
