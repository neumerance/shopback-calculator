import Signup from '../../src/actions/signup';
import Spend from "../../src/actions/spend";

describe('Signup', () => {
  let domain = 'www.shopback.sg';

  describe('#domain', () => {
    it('return domain conf', () => {
      const action = new Signup(domain);
      const conf = action.domain();
      expect(conf.url).toBe(domain);
      expect(conf.currency).toBe('SGD')
    });
  });

  describe('#cashback', () => {
    it('return 5 SGD cashback', () => {
      const action = new Signup(domain);
      expect(action.cashback()).toBe(`Award bonus: 5.00 SGD`);
    });
  });
});
