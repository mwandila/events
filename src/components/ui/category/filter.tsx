import React, { useState } from 'react';
import { EventCategory } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from 'lucide-react';
import { FilterOptions } from '@/types/eventscatTypes';

interface FilterEventsProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

const FilterEvents: React.FC<FilterEventsProps> = ({ onApplyFilters }) => {
  const [categories, setCategories] = useState<Record<string, boolean>>({});
  const [dateRange, setDateRange] = useState<string>("This Week");
  const [priceRange, setPriceRange] = useState<string>("All Prices");
  const [eventType, setEventType] = useState<string>("All Types");

  const categoryOptions: string[] = Object.values(EventCategory);

  const handleCategoryChange = (category: string) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      categories: Object.keys(categories).filter(key => categories[key]),
      dateRange,
      priceRange,
      eventType
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2" size={18} />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="mb-2 font-semibold">Categories</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={categories[category] || false}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Date Range</h3>
            <Select onValueChange={(value: string) => setDateRange(value)} defaultValue={dateRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="This Year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Price Range</h3>
            <Select onValueChange={(value: string) => setPriceRange(value)} defaultValue={priceRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Prices">All Prices</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Event Type</h3>
            <Select onValueChange={(value: string) => setEventType(value)} defaultValue={eventType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </DialogContent>
    </Dialog>
  );
};

export default FilterEvents;