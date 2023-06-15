

import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  Route.get("/:id", "CategoriesController.getById");
  Route.get("/", "CategoriesController.getAll");
  Route.post("/", "CategoriesController.create");
  Route.put("/", "CategoriesController.update");
  Route.delete("/:id", "CategoriesController.destory");
}).prefix("categories")

Route.group(() => {
  Route.get("/:id", "DiscountsController.getById");
  Route.get("/", "DiscountsController.getAll");
  Route.post("/", "DiscountsController.create");
  Route.put("/", "DiscountsController.update");
  Route.delete("/:id", "DiscountsController.destory");
}).prefix("discounts")

Route.group(() => {
  Route.get("/:id", "OrderItemController.getById");
  Route.get("/", "OrderItemController.getAll");
  Route.post("/", "OrderItemController.create");
  Route.put("/", "OrderItemController.update");
  Route.delete("/:id", "OrderItemController.destory");
}).prefix("orderitems")

  Route.group(() => {
    Route.get("/:id", "OrdersController.getById");
    Route.get("/", "OrdersController.getAll");
    Route.post("/", "OrdersController.create");
    Route.put("/", "OrdersController.update");
    Route.delete("/:id", "OrdersController.destory");
  }).prefix("orders");

  Route.group(() => {
    Route.get("/:id", "PaymentsController.getById");
    Route.get("/", "PaymentsController.getAll");
    Route.post("/", "PaymentsController.create");
    Route.put("/", "PaymentsController.update");
    Route.delete("/:id", "PaymentsController.destory");
  }).prefix("payments")

  Route.group(() => {
    Route.get("/:id", "ProductsController.getById");
    Route.get("category/:categoryId", "ProductsController.getByCategoryId");
    Route.get("/", "ProductsController.getAll");
    Route.post("/", "ProductsController.create");
    Route.put("/", "ProductsController.update");
    Route.delete("/:id", "ProductsController.destory");
  }).prefix("products")



  Route.group(() => {
    Route.get("/:id", "UsersController.getById");
    Route.get("/", "UsersController.getAll");
    Route.post("/login", "UsersController.login");
    Route.post("/logout", "UsersController.logout");
    Route.post("/signup", "UsersController.create");
    Route.put('/', "UsersController.update");
    }).prefix("/users");
