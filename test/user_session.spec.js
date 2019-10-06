var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var api_gen = require('secure-random-string');
const bcrypt = require('bcrypt');
var User = require('../models').User;


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
    expect(Object.keys(res.body)).toContain('api_key');
  });
});

describe('POST /api/v1/sessions', () => {
  test('No Email', async () => {
    const res = await request(app).post('/api/v1/sessions').send(no_email);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(JSON.parse('{"err_message": "Email cannot be empty"}'));
  });
});

describe('POST /api/v1/sessions', () => {
  test('No Password', async () => {
    const res = await request(app).post('/api/v1/sessions').send(no_password);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(JSON.parse('{"err_message": "password cannot be empty"}'));
  });
});

describe('POST /api/v1/sessions', () => {
  test('Invalid Password and Email Combination', async () => {
    User.create({
      email: "paul.h.schlattmann@gmail.com",
      password: bcrypt.hashSync("1234", 10),
      api_key: api_gen()
    });
    const res = await request(app).post('/api/v1/sessions').send(passwords_do_not_match);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual(JSON.parse('{"err_message": "Incorrect Email or Password"}'));
  });
});
