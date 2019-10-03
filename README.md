# Express Sweater Weather:

<details>
           <summary> Setup </summary>
           <p>
                      
- Determine postgres username in CLI with ```$ psql```

- Update /config/config.json with

|Provided      | Fill With    |
|------------- | -------------
|"dialect":    | "postgres"   |
|"username":   | "<your_username>"|



- ```$ npx sequelize db:create```

- ```$ npx sequelize db:migrate```
</p>
</details>

<details>
<summary> Run Application Locally </summary>
<p>

```$ npm start``` 
</p>
</details>

<details>
<summary> Run Tests </summary>
<p>
           
```$ npm test```
</p>
</details>

## Author(s)

Paul Schlattmann
---

[![linkedin](data:image/png;base64,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)][3]

---
