## Задание 1 сервис 1 / пользователи  

Используется Sequelize поверх postgresql, переменные окружения могут храниться в .env текущей папки, либо передаваться в аргументах cli  
Список env:  

|Переменная|Описание|
|----------|--------|
| DB_HOST      | хост(адрес) базы данных      |
| DB_PORT      | порт базы данных             |
| DB_NAME      | имя базы данных              |
| DB_USER      | имя пользователя базы данных |
| DB_PASS      | пароль пользователя данных   |
| PORT         | порт текущего сервиса        |
| HISTORY_PORT | порт сервиса с историей пользователей|

Для сервера используется Express

Связь с соседним сервисом осуществляется через http запрос (axios), 