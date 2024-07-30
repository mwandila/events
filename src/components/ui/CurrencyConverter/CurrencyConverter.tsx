import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define a type for the props
interface CurrencyConverterProps {
  userCountry: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ userCountry }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);

  // Map of countries to their primary currency
  const countryCurrencyMap: { [key: string]: string } = {
    'US': 'USD',
    'GB': 'GBP',
    'DE': 'EUR',
    'FR': 'EUR',
    'JP': 'JPY',
    'CN': 'CNY',
    // Add more countries as needed
  };

  useEffect(() => {
    // Set the initial 'from' currency based on the user's country
    const userCurrency = countryCurrencyMap[userCountry] || 'USD';
    setFromCurrency(userCurrency);
  }, [userCountry]);

  useEffect(() => {
    // In a real application, you would fetch the exchange rate from an API
    // For this example, we'll use mock exchange rates
    const mockExchangeRates: { [key: string]: number } = {
      'USDEUR': 0.85,
      'USDGBP': 0.74,
      'USDJPY': 110.0,
      'USDCNY': 6.47,
      'EURUSD': 1.18,
      'EURGBP': 0.87,
      'GBPUSD': 1.35,
      'GBPEUR': 1.15,
      // Add more exchange rates as needed
    };

    const rateKey = `${fromCurrency}${toCurrency}`;
    const inverseRateKey = `${toCurrency}${fromCurrency}`;

    if (mockExchangeRates[rateKey]) {
      setExchangeRate(mockExchangeRates[rateKey]);
    } else if (mockExchangeRates[inverseRateKey]) {
      setExchangeRate(1 / mockExchangeRates[inverseRateKey]);
    } else {
      setExchangeRate(1); // Default to 1 if no rate is found
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="CNY">CNY</SelectItem>
              </SelectContent>
            </Select>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="CNY">CNY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;