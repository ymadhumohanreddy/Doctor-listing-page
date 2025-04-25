
import React, { useState, useEffect, useRef } from 'react';
import { Doctor } from '../services/doctorApi';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface DoctorSearchProps {
  doctors: Doctor[];
  onSearch: (name: string) => void;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({ doctors, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3);
    
    setSuggestions(filteredDoctors);
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-8xl relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          data-testid="autocomplete-input"
          type="text"
          className="w-full pl-10 pr-4"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
          {suggestions.map((doctor) => (
            <li 
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              {doctor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorSearch;
