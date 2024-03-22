import request from 'supertest';
import app from '../index';
import Product from '../models/product';
import { authenticateToken } from '../middlewares/auth';

// Mocking Product model functions
jest.mock('../models/Product');
// Mocking authentication middleware
jest.mock('../middleware/authMiddleware');

describe('Product Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new product', async () => {
        // Mock authenticated request
        authenticateToken.mockImplementation((req: { user: { _id: string; }; }, res: any, next: () => void) => {
            req.user = { _id: 'mockUserId' };
            next();
        });

        const mockProduct = { name: 'Test Product', description: 'Test Description', price: 10 };
        Product.prototype.save.mockResolvedValue(mockProduct);

        const res = await request(app)
            .post('/api/product/create')
            .send(mockProduct);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(mockProduct);
    });

    it('should get all products', async () => {
        const mockProducts = [{ name: 'Product1', description: 'Description1', price: 10 }];
        Product.find.mockResolvedValue(mockProducts);

        const res = await request(app)
            .get('/api/product/all');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockProducts);
    });

    // Add other test cases similarly...
});
