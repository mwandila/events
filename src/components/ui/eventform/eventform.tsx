// EventForm.tsx

import React from 'react';
import { EventCategory, EventType, EventFormData } from '@/types/eventTypes';

interface EventFormProps {
  formData: EventFormData;
  onInputChange: (name: string, value: any) => void;
}

const EventForm: React.FC<EventFormProps> = ({ formData, onInputChange }) => {
  return (
    <>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700 mb-2">Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Date Start:</label>
        <input
          type="date"
          value={formData.dateStart}
          onChange={(e) => onInputChange('dateStart', e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Date End:</label>
        <input
          type="date"
          value={formData.dateEnd}
          onChange={(e) => onInputChange('dateEnd', e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Time Start:</label>
        <input
          type="time"
          value={formData.timeStart}
          onChange={(e) => onInputChange('timeStart', e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Time End:</label>
        <input
          type="time"
          value={formData.timeEnd}
          onChange={(e) => onInputChange('timeEnd', e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700 mb-2">Category:</label>
        <select
          value={formData.category}
          onChange={(e) => onInputChange('category', e.target.value as EventCategory)}
          className="border rounded p-2 w-full"
          required
        >
          {Object.entries(EventCategory).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Total Seats:</label>
        <input
          type="number"
          value={formData.totalSeats}
          onChange={(e) => onInputChange('totalSeats', parseInt(e.target.value))}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">VIP Seats:</label>
        <input
          type="number"
          value={formData.vipSeats}
          onChange={(e) => onInputChange('vipSeats', parseInt(e.target.value))}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">Regular Price:</label>
        <input
          type="number"
          value={formData.regularPrice}
          onChange={(e) => onInputChange('regularPrice', parseFloat(e.target.value))}
          className="border rounded p-2 w-full"
          required={!formData.isFree}
          disabled={formData.isFree}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 mb-2">VIP Price:</label>
        <input
          type="number"
          value={formData.vipPrice}
          onChange={(e) => onInputChange('vipPrice', parseFloat(e.target.value))}
          className="border rounded p-2 w-full"
          required={!formData.isFree}
          disabled={formData.isFree}
        />
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700 mb-2">
          <input
            type="checkbox"
            checked={formData.isFree}
            onChange={(e) => onInputChange('isFree', e.target.checked)}
            className="mr-2"
          />
          Free Event
        </label>
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700 mb-2">Event Type:</label>
        <select
          value={formData.eventType}
          onChange={(e) => onInputChange('eventType', e.target.value as EventType)}
          className="border rounded p-2 w-full"
          required
        >
          {Object.entries(EventType).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default EventForm;