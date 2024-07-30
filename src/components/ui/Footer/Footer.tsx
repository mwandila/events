import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-16 bg-blue-500 text-center text-white">
      <div className="flex justify-center space-x-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Event Planning</h3>
          <ul className="space-y-2">
            <li><a href="/event-planning-tips" className="hover:underline">Event Planning Tips</a></li>
            <li><a href="/event-budgeting-guide" className="hover:underline">Event Budgeting Guide</a></li>
            <li><a href="/event-venue-selection" className="hover:underline">Event Venue Selection</a></li>
            <li><a href="/event-risk-management" className="hover:underline">Event Risk Management</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Event Marketing</h3>
          <ul className="space-y-2">
            <li><a href="/event-marketing-strategies" className="hover:underline">Event Marketing Strategies</a></li>
            <li><a href="/event-registration-best-practices" className="hover:underline">Event Registration Best Practices</a></li>
            <li><a href="/event-sponsorship-opportunities" className="hover:underline">Event Sponsorship Opportunities</a></li>
            <li><a href="/event-sustainability-tips" className="hover:underline">Event Sustainability Tips</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Event Technology</h3>
          <ul className="space-y-2">
            <li><a href="/event-technology-trends" className="hover:underline">Event Technology Trends</a></li>
            <li><a href="/event-accessibility-guidelines" className="hover:underline">Event Accessibility Guidelines</a></li>
            <li><a href="/event-industry-news-and-updates" className="hover:underline">Event Industry News and Updates</a></li>
            <li><a href="/event-case-studies" className="hover:underline">Event Case Studies</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-8">&copy; 2024. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
