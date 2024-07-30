
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddSponsorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [sponsorData, setSponsorData] = useState({
    name: '',
    logo: '',
    website: '',
    tier: 'BRONZE',
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSponsorData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/events/${id}/sponsors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorData),
      });

      if (!response.ok) {
        throw new Error('Failed to add sponsor');
      }

      router.push(`/event/${id}/analytics`);
    } catch (error) {
      console.error('Error adding sponsor:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h1>Add Sponsor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Sponsor Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={sponsorData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="logo">Logo URL:</label>
          <input
            type="url"
            id="logo"
            name="logo"
            value={sponsorData.logo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={sponsorData.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tier">Sponsorship Tier:</label>
          <select
            id="tier"
            name="tier"
            value={sponsorData.tier}
            onChange={handleChange}
            required
          >
            <option value="BRONZE">Bronze</option>
            <option value="SILVER">Silver</option>
            <option value="GOLD">Gold</option>
            <option value="PLATINUM">Platinum</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount">Sponsorship Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={sponsorData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Sponsor</button>
      </form>
    </div>
  );
}