import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '10s', target: 500 },
    { duration: '100s', target: 500 },
  ],
  // vus: 500,
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
  let res = http.get(`http://localhost:8080/products/${id}/related`);
  // let res = http.get(`http://localhost:3000/products/${id}/related`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);

  // // get one product styles
  // const id = 1 + Math.floor(Math.random() * 10000);
  // let res = http.get(`http://localhost:3000/products/${id}/styles`);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);
}