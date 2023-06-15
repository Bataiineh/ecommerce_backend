import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Orderitem from 'App/Models/OrderItem';


export default class OrderItemController {
  public async getAll(_ctx: HttpContextContract) {
    var result = await Orderitem.all();
    return result;
}
public async getById(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var result = await Orderitem.findOrFail(id);
  return result;
}

public async create(ctx: HttpContextContract) {

  const newSchema = schema.create({
      order_id: schema.number(),
      product_id: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var orderItem = new Orderitem();
  orderItem.orderId = fields.order_id;
  orderItem.productId = fields.product_id;
  var result = await orderItem.save();
  return result;

}

public async update(ctx: HttpContextContract) {
  const newSchema = schema.create({
    order_id: schema.number(),
      product_id: schema.number(),
      id: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var id = fields.id;
  var orderItem = await Orderitem.findOrFail(id);
  orderItem.orderId = fields.order_id;
  orderItem.productId = fields.product_id;
  var result = await orderItem.save();
  return result;
}

public async destory(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var orderItem = await Orderitem.findOrFail(id);
  await orderItem.delete();
  return { message: "The Orderitem has been deleted!" };
}
}
