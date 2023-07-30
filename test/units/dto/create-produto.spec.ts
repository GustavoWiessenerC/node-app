import { validate } from 'class-validator';
import { CreateProductDto } from '../../../src/product/dto/create-product.dto';

describe('CreateProductDto', () => {
  it('should pass validation with valid data', async () => {
    const validData = {
      name: 'Test Product',
      description: 'Test description with at least 10 characters',
      price: 10.99,
    };

    const dto = new CreateProductDto();
    Object.assign(dto, validData);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid data', async () => {
    const invalidData = {
      name: '', 
      description: 'ShortsTest', 
      price: -10, 
    };

    const dto = new CreateProductDto();
    Object.assign(dto, invalidData);

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  
  });
});
