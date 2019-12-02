import Signup from '../../src/actions/signup';

describe('Signup', () => {
  let domain = 'www.shopback.sg';

  describe('#domain', () => {
    it('return domain conf', () => {
      const action = new Signup({ domain });
      const conf = action.domain();
      expect(conf.url).toBe(domain);
      expect(conf.currency).toBe('SGD')
    });
  });

  describe('#process', () => {
    it('return 5 SGD cashback', () => {
      const action = new Signup({ domain });
      expect(action.process()).toBe(`Award bonus: 5.00 SGD`);
    });

    it('returns Domain not found', () => {
      const action = new Signup({ domain: 'www.notexistingdomain.com' });
      const expectation = 'Domain not found';
      const received = action.process();
      expect(received).toBe(expectation);
    });
  });
});
