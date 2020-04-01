# Transportadora FastFeet (fictícia)

Partial project for Bootcamp GoStack
(by [Rocketseat](https://github.com/Rocketseat)).

RESTful API built with Express and runs on Node (Back-end only), to be
integrated with Front-end and Mobile interfaces (still to be developed).

## Database and users

The API is based on a PostgreSQL database, virtualized on Docker at development,
and interfaced with Sequelize ORM.
There are three kinds of users, each in its table in the database:

- Admins (table 'users')
- Transporters
- Recipients

Transporters and Recipients can only be modified by an Admin.

### Development issues

The database presented a problem with the 'users' table, detecting a column
which belongs to another table, making the API return an error of
'column does not exist' from Sequelize.
