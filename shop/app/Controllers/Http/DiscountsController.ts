import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Discount from 'App/Models/Discount';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DiscountsController {
  public async getAll(_ctx: HttpContextContract) {
    var result = await Discount.all();
    return result;
}
public async getById(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var result = await Discount.findOrFail(id);
  return result;
}

public async create(ctx: HttpContextContract) {

  const newSchema = schema.create({
      name: schema.string(),
      discount_percent: schema.number(),

  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var discount = new Discount();
  discount.name = fields.name;
  discount.discountPercent = fields.discount_percent;
  var result = await discount.save();
  return result;

}

public async update(ctx: HttpContextContract) {
  const newSchema = schema.create({
    name: schema.string(),
    discount_percent: schema.number(),
    id: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var id = fields.id;
  var discount = await Discount.findOrFail(id);
  discount.name = fields.name;
  discount.discountPercent = fields.discount_percent;
  var result = await discount.save();
  return result;
}

public async destory(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var discount = await Discount.findOrFail(id);
  await discount.delete();
  return { message: "The discount has been deleted!" };
}
}
