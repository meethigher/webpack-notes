import '../css/index.less';

import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4,5));
// eslint-disable-next-line
console.log(mul(2,3));