import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../src/middlewares/auth';

describe('Authentication Middleware', () => {
  test('should return 401 if no token provided', () => {
    const req = {
      header: jest.fn().mockReturnValue(undefined)
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    authenticateToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('x-auth-token');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 if token is invalid', () => {
    const req = {
      header: jest.fn().mockReturnValue('invalid_token')
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const next = jest.fn() as unknown as NextFunction;

    authenticateToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('x-auth-token');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if token is valid', () => {
    const token = jwt.sign({ id: 'test_user_id' }, 'test_secret');

    const req = {
      header: jest.fn().mockReturnValue(token),
      body: {}
    } as unknown as Request;

    const res = {} as Response;

    const next = jest.fn() as unknown as NextFunction;

    authenticateToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('x-auth-token');
    expect(next).toHaveBeenCalled();
    expect(req.body.user.userId).toEqual('test_user_id');
  });
});
