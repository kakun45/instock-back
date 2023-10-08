# Instock back-end (server)
## xeniya's repo for a Group project: "instock-back" 
## xeniya's repo "instock-front" [is here](https://github.com/kakun45/instock-front)

Used: 
- Git/GitHub, JIRA and the Scrum methodology to manage the collaborative workflow.
- [Figma Style Guide from UX Designers: Desktop/Tablet/Mobile](https://www.figma.com/file/qLdwhUjqq5bKxoNYZ6v5Ze/U---InStock-Mockups?type=design&node-id=1196-0&mode=design)
- BEM/SASS/npm
- Relational database
- Postman

________
## My responsibility in the project
- I used Node.js along with the ```Express``` framework for building web applications and APIs.
- ```const cors = require("cors");``` Used to handle Cross-Origin Resource Sharing (CORS) in an Express application. It enables control of which domains are allowed to access the resources and is crucial when the frontend and backend are hosted on different domains or ports in our group dev environment.
- Created a Router Instance:
``` .Router() ``` creates a new instance of an Express router. A router in Express is a middleware that allows you to group route handlers and perform routing tasks for specific paths or endpoints.
- The database is set with MySQL specifically ```mysql2```, with ```Knex```. Knex provides a fluent API for building complex SQL queries. This makes it easier to construct queries dynamically and handle more intricate operations. Knex uses Promises for asynchronous operations, which makes it easy to work with my asynchronous code. With it I created tables, built migration management, seeded data, and constructed queries dynamically.
- Set up scripts:
```
    "db:migrate": "npx knex migrate:latest",
    "migrate:rollback": "npx knex migrate:rollback",
    "db:seed": "npx knex seed:run"
```
- Utilized ```.env``` file to avoid hardcoding with security best practices, and made a `.env.sample` file. Then went over the group individually and helped everyone to set up a database and an `.env` on each computer
```
DB_LOCAL_DBNAME = <instock>
DB_LOCAL_USER = <root>
DB_LOCAL_PASSWORD = <password>
```
to load environmental variables from `.env` file used:  `require("dotenv").config();`
to access these values:
```
    database: process.env.DB_LOCAL_DBNAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
```

- Implemented two endpoints to perform operations on resources following RESTfull API practices:
```
/api/warehouses/... // for warehouses Route
/api/inventories/... // for inventories Route
```
These routes and methods align with the principles of a RESTful API. Each route corresponds to a specific resource (in this case, inventories and warehouses) and maps to a specific HTTP method to perform operations on those resources. For example:
```
router.route("/").get(inventoriesController.index);

router.route("/:inventoryId").get(inventoriesController.getSingleInventory);

router.route("/").post(inventoriesController.addInventory);

router.route("/:id").put(inventoriesController.updateInventory);

router.route("/:id").delete(inventoriesController.deleteInventory);
```
- Defined JavaScript functions in controllers:
```
inventoriesController.js
warehousesController.js
```
for example, `addInventory` from `inventoriesController.js`:
This code is responsible for adding a new inventory item to a database, performing input validation, generating a unique ID, and responding with appropriate status codes and messages. Let's break down what it does:
1. Function Definition:

`exports.addInventory = (req, res) => {...}:` This is a function exported from a module. It is used as a route handler in a Node.js and Express.js application. It takes two parameters: req (request) and res (response), which are objects representing the incoming request and the outgoing response.

2. Generating a Unique ID:

`const id = crypto.randomUUID();` This line uses the crypto module to generate a unique random ID. This ID will be used to identify the newly created inventory item.

3. Extracting Data from the Request Body:

`const warehouse_id = req.body.warehouse_id;` This line extracts the `warehouse_id` from the request body. It assumes that the request body contains a property named `warehouse_id`.

4. Input Validation:

The subsequent `if` statement checks if certain required fields (`warehouse_id`, `item_name`, `description`, `category`, `quantity`) are present in the request body. If any of these fields are missing, it sends a 400 Bad Request response with the message "Please fill in all fields".

5. Database Insertion:

`knex("inventories").insert({...})` This line uses the Knex.js library to perform an insertion into a database table named "inventories". It inserts an object containing the data from the request body along with the generated `id` and `warehouse_id`.

6. Handling the Promise:

`.then((data) => {...})` This is a promise callback that executes if the database insertion is successful. It sends a 201 Created status along with the location of the newly created resource in the response header. The response body contains the same URL.

7. Error Handling:

`.catch((err) => {...})` This handles any errors that occur during the database operation. It sends a 400 Bad Request response with an error message.
