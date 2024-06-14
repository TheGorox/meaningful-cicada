## Задание 2

Используется Nest.js, бд - Sequelize поверх postgres

Переменные окружения:
|Переменная|Описание|
|----------|--------|
| DB_HOST      | хост(адрес) базы данных      |
| DB_PORT      | порт базы данных             |
| DB_NAME      | имя базы данных              |
| DB_USER      | имя пользователя базы данных |
| DB_PASS      | пароль пользователя данных   |
| PORT         | порт сервиса                 |

Чтобы заполнить дб используйте `npm run migrate:fillUsers` (должны быть установлены devDependencies)

Пример взаимодействия:
`POST /users/unmarkProblems`
```
{
  "count": 499806
}
```
`POST /users/unmarkProblems`
```
{
  "count": 0
}
```