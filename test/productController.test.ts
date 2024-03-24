import Products from '../src/controllers/product';
import { Request, Response } from 'express';
import Product from '../src/models/product';

const productController = new Products();


jest.mock('../src/models/product');

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createProduct should create a new product', async () => {
    const req = {
      body: {
        name: 'Test Product',
        description: 'Test Description',
        price: 10
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Mock save function of Product model
    const saveMock = jest.fn().mockResolvedValue({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });

    Product.prototype.save = saveMock;

    await productController.createProduct(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
  });
  test('updateProduct should update existing product', async () => {
    const req = {
      body: {
        name: 'Test Product',
        description: 'Test Description',
        price: 10
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Mock save function of Product model
    const saveMock = jest.fn().mockResolvedValue({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });

    Product.prototype.save = saveMock;

    await productController.updateProduct(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
  });
});
