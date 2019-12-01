import Spend from '../../src/actions/spend';

describe('Spend', () => {
  let action = null;
  let domain = null;
  let spendings = [];

  describe('#domain', () => {
    domain = 'www.shopback.sg';
    it('return domain conf', () => {
      const action = new Spend(domain, spendings);
      const conf = action.domain();
      expect(conf.url).toEqual(domain);
      expect(conf.currency).toEqual('SGD')
    });
  });

  describe('#rate', () => {
    domain = 'www.shopback.sg';
    it('returns domain rate', async () => {
      const action = new Spend(domain, spendings);
      const rate = await action.rate();
      expect(rate).not.toBeNull();
    });
  });
});
