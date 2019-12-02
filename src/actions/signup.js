import Domains from '../confs/domains'

class Signup {
  constructor(options) {
    this.domainName = options.domain;
  }

  domain() {
    return Domains.find(x => x.url === this.domainName);
  }

  process() {
    const domain = this.domain();
    if (!domain) { return 'Domain not found'; }
    return `Award bonus: ${domain.signup.cashback.toFixed(2)} ${domain.currency}`;
  }
}

Signup.requireArgs = false;

export default Signup;
