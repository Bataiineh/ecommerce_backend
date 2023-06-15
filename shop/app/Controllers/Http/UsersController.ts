
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class UsersController {
  public async getAll(_ctx: HttpContextContract) {
    var result = await User.all();
    return result;}
    public async login(ctx: HttpContextContract) {
        var object = ctx.request.all();
        var email = object.email;
        var password = object.password;

        var result = await ctx.auth.attempt(email, password);
        return result;
    }

    async update({ auth, request, response }: HttpContextContract) {

      try {
          var authObject = await auth.authenticate();

          const createSchema = schema.create({
              email: schema.string([
                  rules.email(),
              ]),
              username: schema.string([
                  rules.minLength(2)
              ])
          });

          const payload = await request.validate({ schema: createSchema });
          const user = await User.findOrFail(authObject.id);
          user.username = payload.username;
          user.email = payload.email;
          if (request.input("password") && request.input("password").toString().length > 0) {
              user.password = request.input("password");
          }
          await user.save();
          return user;
      } catch (ex) {
          console.log(ex);
          return response.badRequest({ message: ex.toString() });
      }
  }


    public async logout(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        await ctx.auth.logout();
        return { message: "Logout" }
    }

    public async create(ctx: HttpContextContract) {

      const newSchema = schema.create({
          email: schema.string({}, [
              rules.email(),
          ]),
          password: schema.string(),
          username: schema.string(),
          fullName: schema.string(),
          phone: schema.number(),
          addess: schema.string(),
      },);
      const fields = await ctx.request.validate({
          schema: newSchema,
          messages: {
              required: 'The {{ field }} is required to create a new account',
          }
      });
      var user = new User();
      user.username = fields.username;
      user.email = fields.email;
      user.password = fields.password;
      user.fullName = fields.fullName;
      user.phone = fields.phone;
      user.address = fields.addess;
      var newUser = await user.save();
      return newUser;

  }
  public async getById(ctx: HttpContextContract) {

    var id = ctx.params.id;
    var result = await User.findOrFail(id);
    return result;
  }
    public async destory(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
                console.log(object);

                var id = ctx.params.id;
                var order = await User.findOrFail(id);
                await order.delete();
                return { message: "The user has been deleted!" };
            }


}
