import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProductsController {
  public async getAll(_ctx: HttpContextContract) {
    var result = await Product.all();
    return result;
}
public async getById(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var result = await Product.findOrFail(id);
  return result;
}
public async getByCategoryId(ctx: HttpContextContract) {
  const categoryId = ctx.params.categoryId;
  const result = (await Product.query().where('category_id', categoryId));
  return result;
}


public async create(ctx: HttpContextContract) {

  const newSchema = schema.create({
      product_name: schema.string(),
      price: schema.number(),
      discount_id: schema.number(),

  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var product = new Product();
  product.productName = fields.product_name;
  product.price = fields.price;
  product.discountId = fields.discount_id;
  var result = await product.save();
  return result;

}

public async update(ctx: HttpContextContract) {
  const newSchema = schema.create({
    product_name: schema.string(),
      price: schema.number(),
      discount_id: schema.number(),
    id: schema.number(),
  });
  const fields = await ctx.request.validate({ schema: newSchema })
  var id = fields.id;
  var product = await Product.findOrFail(id);
  product.productName = fields.product_name;
  product.price = fields.price;
  product.discountId = fields.discount_id;
  var result = await product.save();
  return result;
}

public async destory(ctx: HttpContextContract) {

  var id = ctx.params.id;
  var discount = await Product.findOrFail(id);
  await discount.delete();
  return { message: "The discount has been deleted!" };
}
}

