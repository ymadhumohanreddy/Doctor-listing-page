
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/DoctorSearch";
import { FilterPanel } from "@/components/FilterPanel";
import { DoctorCard } from "@/components/DoctorCard";
import { useDoctorData } from "@/hooks/useQueryParams";

const Index = () => {
  const {
    doctors,
    loading,
    error,
    specialties,
    searchQuery,
    consultationType,
    selectedSpecialties,
    sortBy,
    updateFilters,
    getAutocompleteSuggestions,
  } = useDoctorData();

  const handleSearch = (query: string) => {
    updateFilters({ search: query });
  };

  const handleSpecialtyChange = (specialties: string[]) => {
    updateFilters({ specialties });
  };

  const handleConsultationTypeChange = (type: string | null) => {
    updateFilters({ consultationType: type as any });
  };

  const handleSortChange = (sort: string | null) => {
    updateFilters({ sortBy: sort as any });
  };

 return (
  <div className="min-h-screen w-full bg-blue-400 py-8">
    <div className="container mx-auto px-4">
      {/* Header with search */}
      <div className="bg-blue-50 rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Find Doctors</h1>
        <SearchBar 
          searchQuery={searchQuery}
          onSearch={handleSearch}
          getAutocompleteSuggestions={getAutocompleteSuggestions}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        <aside className="w-full md:w-64 md:flex-shrink-0">
          <FilterPanel
            specialties={specialties}
            selectedSpecialties={selectedSpecialties}
            consultationType={consultationType}
            sortBy={sortBy}
            onSpecialtyChange={handleSpecialtyChange}
            onConsultationTypeChange={handleConsultationTypeChange}
            onSortChange={handleSortChange}
          />
        </aside>

        {/* Doctor list */}
        <div className="flex-grow">
          {error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-8">
              No doctors found. Please try adjusting your filters.
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Found {doctors.length} Doctors</h2>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default Index;