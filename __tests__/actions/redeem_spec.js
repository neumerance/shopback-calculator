import Redeem from '../../src/actions/redeem';

describe('Redeem', () => {
  let domain = 'www.shopback.sg';

  describe('#domain', () => {
    it('return domain conf', () => {
      const action = new Redeem(domain);
      const conf = action.domain();
      expect(conf.url).toBe(domain);
      expect(conf.currency).toBe('SGD')
    });
  });

  describe('#cashback', () => {
    it('returns redeem url', () => {
      const action = new Redeem(domain);
      expect(action.cashback()).toBe(`Visit https://www.shopback.sg to start earning cashback!`);
    });
  });
});

