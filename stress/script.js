import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '1s', target: 1000 },
    { duration: '61s', target: 1000 },
  ],
  // vus: 1000,
  // duration: '5s',
};
let count = 0;
export default function () {
  // // get one product information
  // let res = http.get('http://localhost:3000/products/14931');
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // check(res, { 'should get product info': (r) => {
  //   return JSON.parse(res.body).id == 14931
  // } });
  // sleep(1);

  // // get one product information
  // let res = http.get('http://localhost:3000/products/');
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);

  // get one product information
  // const id = 1 + Math.floor(Math.random() * 10000);
  const id = 14034;
  let res = http.get(`http://localhost:300${(count++)%2}/products/${id}/related`);
  // let res = http.get(`http://localhost:3000/products/${id}/related`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);

  // // get one product styles
  // const id = 1 + Math.floor(Math.random() * 10000);
  // let res = http.get(`http://localhost:3000/products/${id}/styles`);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);
}