import ExchangeRate from '../../src/services/exchange_rate_service';

describe('ExchangeRate', function () {
  let service = new ExchangeRate();

  test('getExchangeRate', async function() {
    let response = await service.getExchangeRate('SGD', 'PHP');
    expect(response.base).toEqual('SGD');
    expect(response.rates).toHaveProperty('PHP');
    expect(response.rates['PHP']).not.toBeNull();
  });
});
