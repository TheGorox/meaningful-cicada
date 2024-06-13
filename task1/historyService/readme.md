## Задание 1 сервис 2 / история  

Опять же используется Sequelize поверх postgresql, переменные окружения могут храниться в .env текущей папки, либо передаваться в аргументах cli  
Список env:  

|Переменная|Описание|
|----------|--------|
| DB_HOST      | хост(адрес) базы данных      |
| DB_PORT      | порт базы данных             |
| DB_NAME      | имя базы данных              |
| DB_USER      | имя пользователя базы данных |
| DB_PASS      | пароль пользователя данных   |
| PORT         | порт текущего сервиса        |

Для сервера используется Express

Висит 2 эндпоинта:  
`/api/history/:id?offset=&limit=` для основного задания  

<details>
	<summary>Пример ответа: </summary>
  
    `/api/history/:id?offset=0&limit=10`
    ```
    [{
        "uid": 1,
        "event": "edit",
        "eventData": [{
            "key": "lastName",
            "oldValue": "Slmith",
            "newValue": "Smith"
        }],
        "date": "2024-06-13T19:36:12.109Z"
    }, {
        "uid": 1,
        "event": "create",
        "eventData": null,
        "date": "2024-06-13T19:08:42.528Z"
    }]
    ```
    `/api/history/:id?offset=1&limit=10`
    ```
    [{
        "uid": 1,
        "event": "create",
        "eventData": null,
        "date": "2024-06-13T19:08:42.528Z"
    }]
    ```
</details>

`/api/history/push` для связи с соседним сервисом  
с body вида  
```
{
  event: 'EDIT'|'CREATE',
  userId: 1,
  eventData: [ { key, oldValue, newValue }... ]
}
```
( ну не добавлять же нам логи без какой-либо информации! )

todo: отдельная авторизация для сервисного /history/push