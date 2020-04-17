import { ShoppingCartMiddleware } from './shopping-cart.middleware';

describe('ShoppingCartMiddleware', () => {
  it('should be defined', () => {
    expect(new ShoppingCartMiddleware()).toBeDefined();
  });
});
