import type { Currency } from '../types';

class CurrencyService {
  static async getCurrencies(): Promise<Currency[]> {
    const response = await fetch('https://interview.switcheo.com/prices.json');
    if (!response.ok) {
      throw new Error('Failed to get currency data.');
    }
    let data: Currency[] = await response.json();
    const map: Record<string, Currency> = {};
    data.forEach((item) => {
      item.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${item.currency}.svg`;
      const existingItem = map[item.currency];
      if (!existingItem || new Date(item.date) > new Date(existingItem.date)) {
        map[item.currency] = item;
      }
    });
    data = Object.values(map);

    // For demoing loader
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return data;
  }
}

export default CurrencyService;
