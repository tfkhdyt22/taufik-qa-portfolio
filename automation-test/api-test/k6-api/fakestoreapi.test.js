import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  console.log('--- FakeStore API End-to-End Test ---');

  // 1. GET Products
  let res = http.get('https://fakestoreapi.com/products');
  let products = JSON.parse(res.body);
  check(res, {
    '[Products] Status is 200': (r) => r.status === 200,
    '[Products] Has at least 1 product': () => products.length > 0,
  });

  // 2. Create Cart
  res = http.post('https://fakestoreapi.com/carts',
    JSON.stringify({
      userId: 1,
      date: "2025-09-03",
      products: [{ productId: products[0].id, quantity: 1 }]
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  let cart = JSON.parse(res.body);
  check(res, {
    '[Create Cart] Status is 200/201': (r) => r.status === 200 || r.status === 201,
    '[Create Cart] Cart ID exists': () => cart.id !== undefined,
  });

  // 3. Update Cart
  res = http.put(`https://fakestoreapi.com/carts/${cart.id}`,
    JSON.stringify({
      userId: 1,
      date: "2025-09-03",
      products: [{ productId: products[0].id, quantity: 2 }]
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  let updated = JSON.parse(res.body);
  check(res, {
    '[Update Cart] Status is 200': (r) => r.status === 200,
    '[Update Cart] Quantity updated to 2': () => updated.products[0].quantity === 2,
  });

  // 4. Delete Cart
  res = http.del(`https://fakestoreapi.com/carts/${cart.id}`);
check(res, {
  '[Delete Cart] Status is 200': (r) => r.status === 200,
  '[Delete Cart] Valid response': (r) => {
    try {
      let body = JSON.parse(r.body || '{}');
      return typeof body === 'object';
    } catch (e) {
      return r.body === '' || r.body.trim() === '{}';
    }
  },
});
}
