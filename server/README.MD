## Service

Все написанные функции помещаем в класс. Не забывает про экспорт данного класса!

```sh
class ProductService {
    async getProducts() {...}
    async createProduct() {...}
    async editProduct() {...}
    async deleteProduct() {...}
}
export default ProductService;
```

> Get запросы нужны для получения данных с сервера (например получить список товаров)

```sh
async getProducts() {
    const response = await client.query(`select * from test`);
    return response;
}
```

> Post запросы нужны для добавления\сохранения данных в базе данных (например создать товар)

```sh
async createProduct(product_name, price, description) {
    await client.query(`insert into products (product_name, price, description)
    values ($1, $2, $3)`,
    [product_name, price, description]);
}
```

В данном примере функция createProduct ничего не возвращает (нет строчки return) по желанию ее можно добавить как ответ сервера, на выполнение функции, например предоставить статус выполнеия.

> Put запросы нужны для редактирования данных в базе данных (например изменить товар)

```sh
async editProduct(id_product, product_name, price, description) {
    await client.query(`update products set product_name = $1, price = $2, description = $3
    where id_roduct = $4`,
    [id_product, product_name, price, description]);
}
```

> Delete запросы нужны для удаления данных в базе данных (например удалить товар)

```sh
async deleteProduct(id_product) {
    await client.query(`delete from products where id_product = $1`, [id_product]);
}
```

## Controller

Все написанные функции помещаем в класс. Не забывает про экспорт данного класса!
Название такие же как и в сервисах, но если будут одинаковые имена, то все сломается. Просто пишем все с большой буквы.

```sh
class ProductController {
    async GetProducts() {...}
    async CreateProduct() {...}
    async EditProduct() {...}
    async DeleteProduct() {...}
}
export default ProductService;
```

> Get запросы нужны для получения данных с сервера (например получить список товаров)

```sh
async getProducts(req, res, next) {
    try {
      const response = await productService.getProduct();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
}
```

Строчка "return res.json(response.row)" формирует объект с данными, которые мы выбрали с помощью query запроса, и в дальнейшем он будет отправлен на сервер, где мы будем уже работать с этими данными.

> Post запросы нужны для добавления\сохранения данных в базе данных (например создать товар)

```sh
async CreateProduct(req, res, next) {
    try {
    const {product_name, price, description} = req.body;
      await productService.createProduct(product_name, price, description);
      return res.json('success');
    } catch (e) {
      next(e);
    }
}
```

Ранее мы говорили что post запрос ничего не возвращает (нет строчки return),в данном примере мы захотели получить ответ с сервера, если все запросы были были успешно выполнены "return res.json('success')" сервер вернет "success" если запросы выполнены без ошибок.
А как вернуть ошибку? ну тут проще уже все настроено, и middleware отловит ошибку через строчку "next(e)" и вернет ошибку на клиент.

> Put запросы нужны для редактирования данных в базе данных (например изменить товар)

```sh
async EditProduct(req, res, next) {
    try {
      const {id_product, product_name, price, description} = req.body;
      await productService.editProduct(id_product, product_name, price, description);
      return res.json('Продукт изменен');
    } catch (e) {
      next(e);
    }
}
```

> Delete запросы нужны для удаления данных в базе данных (например удалить товар)

```sh
async DeleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      return res.json('Продукт удален');
    } catch (e) {
      next(e);
    }
  }
```

## Routes

Здесь еще все проще указывает тип запроса (.get .put. post .delete)
Выбираем путь, по этому пути будет выбираться нужный нам запрос, нельяз чтобы они повторялись!
Далее выбираем функцию из контроллера, которую мы уже ранее создали.

```sh
productRouter.get('/getProduct', productController.GetProduct);
productRouter.post('/createProduct', productController.CreateProduct);
productRouter.put('/editProduct', productController.EditProduct);
productRouter.delete('/deleteProduct/:id', productController.DeleteProduct);
```

почему delete не похож на другие? запрос delete не имеет тела (body), как и get запрос, они имееют параметры.
https://vk.com/detskiy_pogreb73 вот пример параметра это id человека, цифра или текст без разницы.
Используют данный метода как раз таки, чтобы удалить запись по id, или получить 1 запись по id.

## Export\import

Чтобы экспортировать мы используем два вида записей

```sh
export default myClass/myFunc ...
```

и

```sh
export myClass/myFunc ...
```

Чтобы импортировать мы используем два вида записей в зависиммости от экспорта.
Если export default то:

```sh
import myClass/myFunc from 'path to file'
```

Если export то:

```sh
import {myClass/myFunc} from 'path to file'
```

## Bisnes logic

Вся логика с монипулированием данных должна быть на сервере, жедательно.
Клиент это просто оболочка, которое отображает данные или отправялет.

Рассмотрим пример авторизации(регситрации). Когда мы создаем аккаунт, мы должны проверить а есть ли уже такой логин? а почта?
Как проверить ести ли иакой логин? Правильно отправим запрос на свервер!

```sh
let hasAlreadyLogin = await client.query(
  `select login from users where login = $1`,
  [login]
);
```

Как это нам поможет? Когда мы отправляем данный запрос, ответом на этот запрос будет список пользователей с логином, который мы указали. Если пользователь такой есть будет 1 запись, если такого пользователя нет будет 0 записей. Проверим это в коде.

```sh
if (
      hasAlreadyLogin.rows[0] !== null &&
      hasAlreadyLogin.rows[0] !== undefined
    ) {
      throw ApiError.BadRequest("Данный логин уже существует");
    }
```

Если hasAlreadyLogin.rows[0] (содержит ряд с данными ) не равен null и undefined (это две переменные обозначают ПОЧТИ одно и то же, но проаерять лучше сразу и на то и другое) то все хорошо и мы двигаемся дальше по коду, если в поле что-то есть выполняеться строчка кода, которая завершает выполнение функции досрочно, и возвращает ошибку.

## Все это ситуативно, и в зависимости от задачи что-то может добавиться, что-то убираеться, это лишь пример использования.
