import Users from '../src/controllers/user';
import { Request, Response } from 'express';
import User from '../src/models/user';

const userController = new Users();


jest.mock('../src/models/user');

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createUser should create a new user', async () => {
    const req = {
      body: {
        name: 'Test User',
        email: 'foo@bar.com',
        password: "Test Password"
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Mock save function of User model
    const saveMock = jest.fn().mockResolvedValue({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    User.prototype.save = saveMock;

    await userController.createUser(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
  });
  test('updateUser should update existing user', async () => {
    const req = {
      body: {
        name: 'Test User',
        email: 'foo@bar.com',
        password: "Test Password"
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Mock save function of User model
    const saveMock = jest.fn().mockResolvedValue({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    User.prototype.save = saveMock;

    await userController.updateUser(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
  });
});
