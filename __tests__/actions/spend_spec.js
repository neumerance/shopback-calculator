import Spend from '../../src/actions/spend';

describe('Spend', () => {
  let domain = 'www.shopback.sg';

  describe('#domain', () => {
    it('return domain conf', () => {
      const action = new Spend({ domain, params: [] });
      const conf = action.domain();
      expect(conf.url).toEqual(domain);
      expect(conf.currency).toEqual('SGD')
    });
  });

  describe('#highestSpending', () => {
    it('returns the highest spending', () => {
      const action = new Spend({ domain, params: [1, 3, 9] });
      expect(action.highestSpending()).toEqual(9);
    });

    it('ignores the non numeric values', () => {
      const action = new Spend({ domain, params: [1, 'kamote', 9] });
      expect(action.highestSpending()).toEqual(9);
    });
  });

  describe('#lowestSpending', () => {
    it('returns the lowest spending', () => {
      const action = new Spend({ domain, params: [1, 3, 9] });
      expect(action.lowestSpending()).toEqual(1);
    });

    it('ignores the non numeric values', () => {
      const action = new Spend({ domain, params: [1, 'kamote', 9] });
      expect(action.lowestSpending()).toEqual(1);
    });
  });

  describe('#cashbackPercentage', () => {
    it('returns 20%', () => {
      const spendings = [50, 100, 30];
      const action = new Spend({ domain, params: spendings });
      expect(action.cashbackPercentage()).toBe(.15);
    });

    it('returns 15%', () => {
      const spendings = [20, 15, 30];
      const action = new Spend({ domain, params: spendings });
      expect(action.cashbackPercentage()).toBe(.1);
    });

    it('returns 5%', () => {
      const spendings = [1, 7, 10];
      const action = new Spend({ domain, params: spendings });
      expect(action.cashbackPercentage()).toBe(.05);
    });
  });

  describe('#cashback', () => {
    it('returns cashback notice', async () => {
      const spendings = [50, 100, 30];
      const action = new Spend({ domain, params: spendings });
      const amount = 100 * .15;
      const expectation = `Award cashback: ${(amount).toFixed(2)} SGD`;
      const received = await action.process();
      expect(received).toBe(expectation);
    });

    it('return 0 cashback', async () => {
      const action = new Spend({ domain, params: [] });
      const expectation = 'No cashback';
      const received = await action.process();
      expect(received).toBe(expectation);
    });
  });
});
