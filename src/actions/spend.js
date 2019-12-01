import Domains from '../confs/domains'
import ExchangeRate from "../services/exchange_rate_service";

const NUMERIC = /^\d+$/;

class Spend {
  constructor(options) {
    this.domainName = options.domain;
    this.spendings = options.params.filter(x => x.toString().match(NUMERIC));
  }

  domain() {
    return Domains.find(x => x.url === this.domainName);
  }

  async rate() {
    const data = await new ExchangeRate().getExchangeRate('USD', this.domain().currency);
    return data.rates[this.domain().currency];
  }

  highestSpending() {
    return Math.max.apply(null, this.spendings);
  }

  averageSpending() {
    if (!this.spendings.length) { return 0; }
    return this.spendings.reduce((sum, x) => sum + x) / this.spendings.length;
  }

  cashbackPercentage() {
    const amount = this.averageSpending();
    if (amount >= 50) {
      return .20
    } else if (amount >= 20) {
      return .15
    } else if (amount >= 10) {
      return .1
    } else {
      return .05
    }
  }

  async process() {
    let amount = 0;
    let exchangeRate = await this.rate();
    if (this.spendings.length && exchangeRate) {
      amount = this.highestSpending() * this.cashbackPercentage();
    }
    return `Award cashback: ${(amount / exchangeRate).toFixed(2)} USD`
  }
}

export default Spend;
