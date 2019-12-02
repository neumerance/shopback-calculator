import Redeem from '../../src/actions/redeem';

describe('Redeem', () => {
  let domain = 'www.shopback.sg';

  describe('#domain', () => {
    it('return domain conf', () => {
      const action = new Redeem({ domain });
      const conf = action.domain();
      expect(conf.url).toBe(domain);
      expect(conf.currency).toBe('SGD')
    });
  });

  describe('#process', () => {
    it('returns redeem url', () => {
      const action = new Redeem({ domain });
      expect(action.process()).toBe(`Visit https://www.shopback.sg to start earning cashback!`);
    });

    it('returns Domain not found', () => {
      const action = new Redeem({ domain: 'www.notexistingdomain.com' });
      const expectation = 'Domain not found';
      const received = action.process();
      expect(received).toBe(expectation);
    });
  });
});

