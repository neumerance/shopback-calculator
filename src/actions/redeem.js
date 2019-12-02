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
    if (!domain) { return 'Domain not found'; }
    return `Visit https://${domain.url} to start earning cashback!`;
  }
}

Redeem.requireArgs = false;

export default Redeem;
