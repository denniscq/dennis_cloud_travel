import Mock from 'mockjs';
import cityRes from './city.json';
import sgsgRes from './sgsg.json';
import mlphRes from './mlph.json';
import klmyRes from './klmy.json';

Mock.mock('https://hiring.zumata.xyz/job01/autosuggest', 'get', () => cityRes);
Mock.mock('https://hiring.zumata.xyz/job01/search/sgsg', 'get', () => sgsgRes);
Mock.mock('https://hiring.zumata.xyz/job01/search/mlph', 'get', () => mlphRes);
Mock.mock('https://hiring.zumata.xyz/job01/search/klmy', 'get', () => klmyRes);

export default Mock;
