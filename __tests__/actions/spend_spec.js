import Spend from '../../src/actions/spend';

describe('Spend', () => {
  let domain = 'www.shopback.sg';

  describe('#domain', () => {
    domain = 'www.shopback.sg';
    it('return domain conf', () => {
      const action = new Spend(domain, []);
      const conf = action.domain();
      expect(conf.url).toEqual(domain);
      expect(conf.currency).toEqual('SGD')
    });
  });

  describe('#rate', () => {
    it('returns domain rate', async () => {
      const action = new Spend(domain, []);
      const rate = await action.rate();
      expect(rate).not.toBeNull();
    });
  });

  describe('#highestSpending', () => {
    it('returns the highest spending', () => {
      const action = new Spend(domain, [1, 3, 9]);
      expect(action.highestSpending()).toEqual(9);
    });

    it('ignores the non numeric values', () => {
      const action = new Spend(domain, [1, 'kamote', 9]);
      expect(action.highestSpending()).toEqual(9);
    });
  });

  describe('#averageSpending', () => {
    it('returns the average spending', () => {
      const spendings = [1, 3, 9];
      const action = new Spend(domain, spendings);
      const expectation = spendings.reduce((sum, x) => sum + x) / spendings.length;
      expect(action.averageSpending()).toEqual(expectation);
    });
  });

  describe('#cashbackPercentage', () => {
    it('returns 20%', () => {
      const spendings = [50, 100, 30];
      const action = new Spend(domain, spendings);
      expect(action.cashbackPercentage()).toBe(.20);
    });

    it('returns 15%', () => {
      const spendings = [20, 15, 30];
      const action = new Spend(domain, spendings);
      expect(action.cashbackPercentage()).toBe(.15);
    });

    it('returns 5%', () => {
      const spendings = [1, 7, 10];
      const action = new Spend(domain, spendings);
      expect(action.cashbackPercentage()).toBe(.05);
    });
  });

  describe('#cashback', () => {
    it('returns cashback notice', async () => {
      const spendings = [50, 100, 30];
      const action = new Spend(domain, spendings);
      const exchangeRate = await action.rate();
      const amount = 100 * .20;
      const expectation = `Award cashback: ${amount / exchangeRate} USD`;
      const received = await action.cashback();
      expect(received).toBe(expectation);
    });

    it('return 0 cashback', async () => {
      const action = new Spend(domain, []);
      const expectation = `Award cashback: 0 USD`;
      const received = await action.cashback();
      expect(received).toBe(expectation);
    });
  });
});
