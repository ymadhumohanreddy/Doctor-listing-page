
import React from 'react';
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string | null;
  sortBy: string | null;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (sortBy: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}) => {
  const renderSpecialtyCheckbox = (specialty: string) => {
    const testId = `filter-specialty-${specialty.replace('/', '-')}`;
    
    return (
      <div key={specialty} className="flex items-center mb-2">
        <Checkbox
          id={`specialty-${specialty}`}
          data-testid={testId}
          checked={selectedSpecialties.includes(specialty)}
          onCheckedChange={() => onSpecialtyChange(specialty)}
        />
        <Label 
          htmlFor={`specialty-${specialty}`} 
          className="ml-2 text-sm font-medium text-gray-700"
        >
          {specialty}
        </Label>
      </div>
    );
  };

  return (
    <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3" data-testid="filter-header-moc">Consultation Mode</h3>
        <RadioGroup
          value={consultationType || ''}
          onValueChange={onConsultationTypeChange}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Video Consult"
              id="video-consult"
              data-testid="filter-video-consult"
            />
            <Label htmlFor="video-consult">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="In Clinic"
              id="in-clinic"
              data-testid="filter-in-clinic"
            />
            <Label htmlFor="in-clinic">In Clinic</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3" data-testid="filter-header-speciality">Speciality</h3>
        <div className="max-h-60 overflow-y-auto pr-2">
          {specialties.map(specialty => renderSpecialtyCheckbox(specialty))}
        </div>
      </div>

      {/* Sort Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3" data-testid="filter-header-sort">Sort</h3>
        <RadioGroup
          value={sortBy || ''}
          onValueChange={onSortChange}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="fees"
              id="sort-fees"
              data-testid="sort-fees"
            />
            <Label htmlFor="sort-fees">Fees (Low to High)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="experience"
              id="sort-experience"
              data-testid="sort-experience"
            />
            <Label htmlFor="sort-experience">Experience (High to Low)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterPanel;
