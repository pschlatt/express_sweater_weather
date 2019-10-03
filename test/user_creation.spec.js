var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');


describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });
});


describe('Successful and Unsuccessful account creation.', () => {
    test('Successful', () => {
      var input = {
        email: 'paul.h.schlattmann@gmail.com',
        password: '1234',
        password_confirmation: '1234'
      };
       return request(app)
        .post('/api/v1/users')
        .send(input)
        .then(response => {
            expect(response.status).toBe(201);
            expect(Object.keys(response.body)).toContain('api_key');
          }
      );
  });
})
