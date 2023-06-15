import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order';



export default class OrdersController {
  public async getAll(_ctx: HttpContextContract) {
    var result = await Order.all();
    return result;
}
public async getById(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var result = await Order.findOrFail(id);
  return result;
}

public async create(ctx: HttpContextContract) {

  const newSchema = schema.create({
      total: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var order = new Order();
  order.total = fields.total;
  var result = await order.save();
  return result;

}

public async update(ctx: HttpContextContract) {
  const newSchema = schema.create({
    total: schema.number(),
      id: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var id = fields.id;
  var order = await Order.findOrFail(id);
  order.total = fields.total;
  var result = await order.save();
  return result;
}

public async destory(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var order = await Order.findOrFail(id);
  await order.delete();
  return { message: "The order has been deleted!" };
}
}
