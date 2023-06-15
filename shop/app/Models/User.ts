
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "username" })
  public username: string;

  @column({ serializeAs: "email" })
  public email: string;

  @column({ serializeAs: "password" })
  public password: string;

  @column({ serializeAs: "full_name" })
  public fullName: string;

  @column({ serializeAs: "phone" })
  public phone: number;

  @column({ serializeAs: "address" })
  public address: string;

  @column({ serializeAs: "type_id" })
  public typeId: string;

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
