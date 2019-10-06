var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
      shell.exec('npx sequelize db:seed:all --env test')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
  });
});

var pass = {
  email: 'paul.h.schlattmann@gmail.com',
  password: '1234',
}

var passwords_do_not_match = {
  email: 'paul.h.schlattmann@gmail.com',
  password: 'abc',
};

var no_password = {
  email: 'paul.h.schlattmann@gmail.com',
  password: '',
};

var no_email = {
  email: '',
  password: '1234',
};

describe('POST /api/v1/sessions', () => {
  test('Is successful', async () => {
    const res = await request(app).post('/api/v1/sessions').send(pass);
    expect(res.statusCode).toEqual(200);
  });
});

describe('POST /api/v1/users', () => {
  test('No Email', async () => {
    const res = await request(app).post('/api/v1/users').send(no_email);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(JSON.parse('{"err_message": "Email cannot be empty"}'));
  });
});

describe('POST /api/v1/users', () => {
  test('No Password', async () => {
    const res = await request(app).post('/api/v1/users').send(no_password);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(JSON.parse('{"err_message": "password cannot be empty"}'));
  });
});

describe('POST /api/v1/users', () => {
  test("Passwords don't match", async () => {
    const res = await request(app).post('/api/v1/users').send(passwords_do_not_match);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(JSON.parse('{"err_message": "Password and Password Confirmaiton must match"}'));
  });
});

describe('POST /api/v1/users', () => {
  test("Unsuccessful user store", async () => {
    const res = await request(app).post('/api/v1/users').send(unsuccessful);
    expect(res.statusCode).toEqual(500);
  });
});
