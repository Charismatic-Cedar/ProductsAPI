import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '20s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '10s', target: 0 },
  ],
  // vus: 1000,
  // duration: '5s',
};
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
  const id = 1 + Math.floor(Math.random() * 10000);
  let res = http.get(`http://localhost:3000/products/${id}/related`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);

  // // get one product styles
  // const id = 1 + Math.floor(Math.random() * 10000);
  // let res = http.get(`http://localhost:3000/products/${id}/styles`);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);
}