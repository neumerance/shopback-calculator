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

  highestSpending() {
    if (!this.spendings.length) { return 0; }
    return Math.max.apply(null, this.spendings);
  }

  lowestSpending() {
    if (!this.spendings.length) { return 0; }
    return Math.min.apply(null, this.spendings);
  }

  cashbackPercentage() {
    const amount = this.lowestSpending();
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

  process() {
    let amount = 0;
    const currentDomain = this.domain();
    if (this.spendings.length) {
      amount = this.highestSpending() * this.cashbackPercentage();
    }
    if (!currentDomain) { return 'Domain not found' }
    if (!amount) { return 'No cashback' }
    return `Award cashback: ${(amount).toFixed(2)} ${currentDomain.currency}`
  }
}

Spend.requireArgs = true;

export default Spend;
