import Domains from '../confs/domains'

class Redeem {
  constructor(domainName, spendings) {
    this.domainName = domainName;
  }

  domain() {
    return Domains.find(x => x.url === this.domainName);
  }

  cashback() {
    const domain = this.domain();
    if (!domain) { return null; }
    return `Visit https://${domain.url} to start earning cashback!`;
  }
}

export default Redeem;
