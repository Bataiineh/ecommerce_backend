import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Payment from 'App/Models/Payment';

export default class PaymentsController {
  public async getAll(_ctx: HttpContextContract) {
    var result = await Payment.all();
    return result;
}
public async getById(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var result = await Payment.findOrFail(id);
  return result;
}

public async create(ctx: HttpContextContract) {

  const newSchema = schema.create({
      order_id: schema.number(),
      amount: schema.number(),
      provider: schema.string(),
      status: schema.string(),

  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var payment = new Payment();
  payment.orderId = fields.order_id;
  payment.amount = fields.amount;
  payment.provider = fields.provider;
  payment.status = fields.status;
  var result = await payment.save();
  return result;

}

public async update(ctx: HttpContextContract) {
  const newSchema = schema.create({
    order_id: schema.number(),
      amount: schema.number(),
      provider: schema.string(),
      status: schema.string(),
      id: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var id = fields.id;
  var payment = await Payment.findOrFail(id);
  payment.orderId = fields.order_id;
  payment.amount = fields.amount;
  payment.provider = fields.provider;
  payment.status = fields.status;
  var result = await payment.save();
  return result;
}

public async destory(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var payment = await Payment.findOrFail(id);
  await payment.delete();
  return { message: "The payment has been deleted!" };
}
}
