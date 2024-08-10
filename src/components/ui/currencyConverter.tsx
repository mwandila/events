

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Map of countries to their primary currency
    const countryCurrencyMap: { [key: string]: string } = {
      'US': 'USD',
      'GB': 'GBP',
      'DE': 'EUR',
      'FR': 'EUR',
      'JP': 'JPY',
      'CN': 'CNY',
      'ZM': 'ZMW', // Zambia
      'MW': 'MWK', // Malawi
      // Add more countries as needed
    };

    // Set the initial 'from' currency based on the user's country
    const userCurrency = countryCurrencyMap[userCountry] || 'USD';
    setFromCurrency(userCurrency);
  }, [userCountry]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === "success") {
          const rate = data.conversion_rates[toCurrency];
          setExchangeRate(rate);
        } else {
          throw new Error('Failed to fetch exchange rate');
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setError('Failed to fetch exchange rate. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
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
                <SelectItem value="ZMW">ZMW</SelectItem> {/* Zambia currency */}
                <SelectItem value="MWK">MWK</SelectItem> {/* Malawi currency */}
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
                <SelectItem value="ZMW">ZMW</SelectItem> {/* Zambia currency */}
                <SelectItem value="MWK">MWK</SelectItem> {/* Malawi currency */}
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <p>Loading exchange rate...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <p className="text-lg font-semibold">
                {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
