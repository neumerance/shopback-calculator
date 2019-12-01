import Domains from '../confs/domains'

class Signup {
  constructor(options) {
    this.domainName = options.domain;
  }

  domain() {
    return Domains.find(x => x.url === this.domainName);
  }

  cashback() {
    const domain = this.domain();
    if (!domain) { return null; }
    return `Award bonus: ${domain.signup.cashback.toFixed(2)} ${domain.currency}`;
  }
}

export default Signup;
