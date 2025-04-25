
import React, { useEffect, useState } from 'react';
import { fetchDoctors, getUniqueSpecialties, Doctor } from '../services/doctorApi';
import DoctorSearch from '../components/DoctorSearch';
import FilterPanel from '../components/FilterPanel';
import DoctorCard from '../components/DoctorCard';
import { useQueryParams } from '../hooks/useQueryParams';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Skeleton } from '../components/ui/skeleton';

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { params, updateParams } = useQueryParams({
    search: '',
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  // Fetch doctor data
  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
        setSpecialties(getUniqueSpecialties(data));
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getDoctors();
  }, []);

  // Apply filters whenever doctors or filter params change
  useEffect(() => {
    if (doctors.length === 0) return;

    let result = [...doctors];

    // Apply name search filter
    if (params.search) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (params.consultationType) {
      result = result.filter(doctor => 
        doctor.moc.includes(params.consultationType!)
      );
    }

    // Apply specialty filters
    if (params.specialties && params.specialties.length > 0) {
      result = result.filter(doctor => 
        params.specialties!.some(specialty => doctor.speciality.includes(specialty))
      );
    }

    // Apply sorting
    if (params.sortBy) {
      if (params.sortBy === 'fees') {
        result.sort((a, b) => a.fee - b.fee);
      } else if (params.sortBy === 'experience') {
        // Sort by experience (assuming experience is in years format like "5 years")
        result.sort((a, b) => {
          const aYears = parseInt(a.experience.split(' ')[0]) || 0;
          const bYears = parseInt(b.experience.split(' ')[0]) || 0;
          return bYears - aYears; // Descending order
        });
      }
    }

    setFilteredDoctors(result);
  }, [doctors, params]);

  // Event handlers
  const handleSearch = (searchTerm: string) => {
    updateParams({ search: searchTerm });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const currentSpecialties = params.specialties || [];
    let newSpecialties: string[];
    
    if (currentSpecialties.includes(specialty)) {
      newSpecialties = currentSpecialties.filter(s => s !== specialty);
    } else {
      newSpecialties = [...currentSpecialties, specialty];
    }
    
    updateParams({ specialties: newSpecialties });
  };

  const handleConsultationTypeChange = (type: string) => {
    updateParams({ consultationType: type });
  };

  const handleSortChange = (sortBy: string) => {
    updateParams({ sortBy });
  };

  return (
    <div className="min-h-screen bg-blue-400 py-8">
      <div className="container mx-auto px-4">
        {/* Header with search */}
        <div className="bg-blue-50 rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Find Doctors</h1>
          <DoctorSearch doctors={doctors} onSearch={handleSearch} />
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <aside className="w-full md:w-64 md:flex-shrink-0">
            <FilterPanel 
              specialties={specialties}
              selectedSpecialties={params.specialties || []}
              consultationType={params.consultationType || null}
              sortBy={params.sortBy || null}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSortChange={handleSortChange}
            />
          </aside>

          {/* Doctor list */}
          <div className="flex-grow">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="ml-4 space-y-2 flex-grow">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-2/5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <Alert variant="destructive" className="bg-red-50">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-500">No doctors found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <p className="text-gray-600">Found {filteredDoctors.length} doctors</p>
                </div>
                
                <div className="space-y-4">
                  {filteredDoctors.map(doctor => (
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
