import Domains from '../confs/domains'
import ExchangeRate from "../services/exchange_rate_service";

class Spend {
  constructor(domainName, spendings) {
    this.domainName = domainName;
    this.spendings = spendings;
  }

  domain() {
    return Domains.find(x => x.url === this.domainName);
  }

  async rate() {
    const data = await new ExchangeRate().getExchangeRate('USD', this.domain().currency);
    return data.rates[this.domain.currency];
  }
}

export default Spend;
