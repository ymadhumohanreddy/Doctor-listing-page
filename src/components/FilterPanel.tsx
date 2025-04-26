import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string | null;
  sortBy: string | null;
  onSpecialtyChange: (specialties: string[]) => void;
  onConsultationTypeChange: (type: string | null) => void;
  onSortChange: (sort: string | null) => void;
}

export function FilterPanel({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FilterPanelProps) {
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      onSpecialtyChange([...selectedSpecialties, specialty]);
    } else {
      onSpecialtyChange(selectedSpecialties.filter((s) => s !== specialty));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <Accordion type="multiple" defaultValue={["consultation", "specialties", "sort"]} className="space-y-4">
        {/* Sort Filter - Moving to top for better visibility */}
        <AccordionItem value="sort">
          <AccordionTrigger className="font-medium text-lg py-2" data-testid="filter-header-sort">
            Sort By
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={sortBy || ""}
              onValueChange={(value) => onSortChange(value || null)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
                <Label htmlFor="sort-fees" className="flex items-center">
                  Fees <span className="text-sm text-gray-500 ml-1">(low to high)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
                <Label htmlFor="sort-experience" className="flex items-center">
                  Experience <span className="text-sm text-gray-500 ml-1">(high to low)</span>
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Consultation Mode Filter */}
        <AccordionItem value="consultation">
          <AccordionTrigger className="font-medium text-lg py-2" data-testid="filter-header-moc">
            Consultation Mode
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={consultationType || ""}
              onValueChange={(value) => onConsultationTypeChange(value || null)}
              className="space-y-2"
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
          </AccordionContent>
        </AccordionItem>

        {/* Specialties Filter */}
        <AccordionItem value="specialties">
          <AccordionTrigger className="font-medium text-lg py-2" data-testid="filter-header-speciality">
            Specialties
          </AccordionTrigger>
          <AccordionContent className="space-y-2 max-h-64 overflow-y-auto">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={`specialty-${specialty}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={(checked) => 
                    handleSpecialtyChange(specialty, checked === true)
                  }
                  data-testid={`filter-specialty-${specialty.replace(/\//g, "-")}`}
                />
                <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}