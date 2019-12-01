import Domains from '../confs/domains'

class Redeem {
  constructor(options) {
    this.domainName = options.domain;
  }

  domain() {
    return Domains.find(x => x.url === this.domainName);
  }

  process() {
    const domain = this.domain();
    if (!domain) { return null; }
    return `Visit https://${domain.url} to start earning cashback!`;
  }
}

export default Redeem;
