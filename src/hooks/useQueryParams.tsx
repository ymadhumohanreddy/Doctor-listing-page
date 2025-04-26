
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Doctor } from "@/types/doctor";
import { fetchDoctors } from "../services/doctorSerice";

type SortOption = "fees" | "experience";
type ConsultationType = "Video Consult" | "In Clinic" | null;

export function useDoctorData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get filters from URL params
  const searchQuery = searchParams.get("search") || "";
  const consultationType = searchParams.get("consultationType") as ConsultationType;
  const sortBy = searchParams.get("sortBy") as SortOption || null;
  const selectedSpecialties = searchParams.getAll("specialty");
  
  // Set filters in URL params
  const updateFilters = (filters: {
    search?: string;
    consultationType?: ConsultationType;
    sortBy?: SortOption | null;
    specialties?: string[];
  }) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Update search param
    if (filters.search !== undefined) {
      if (filters.search) {
        newParams.set("search", filters.search);
      } else {
        newParams.delete("search");
      }
    }
    
    // Update consultation type param
    if (filters.consultationType !== undefined) {
      if (filters.consultationType) {
        newParams.set("consultationType", filters.consultationType);
      } else {
        newParams.delete("consultationType");
      }
    }
    
    // Update sort param
    if (filters.sortBy !== undefined) {
      if (filters.sortBy) {
        newParams.set("sortBy", filters.sortBy);
      } else {
        newParams.delete("sortBy");
      }
    }
    
    // Update specialties param
    if (filters.specialties !== undefined) {
      newParams.delete("specialty");
      filters.specialties.forEach(specialty => {
        newParams.append("specialty", specialty);
      });
    }
    
    setSearchParams(newParams);
  };

  // Fetch doctors data
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch doctors");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getDoctors();
  }, []);

  // Get unique specialties
  const specialties = useMemo(() => {
    const specialtiesSet = new Set<string>();
    doctors.forEach(doctor => {
      doctor.specialties.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    });
    return Array.from(specialtiesSet).sort();
  }, [doctors]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(doctor => {
        // Filter by search query
        if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by consultation type
        if (consultationType && !doctor.consultationType.includes(consultationType)) {
          return false;
        }
        
        // Filter by specialties
        if (selectedSpecialties.length > 0) {
          const hasSelectedSpecialty = doctor.specialties.some(specialty => 
            selectedSpecialties.includes(specialty)
          );
          if (!hasSelectedSpecialty) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by selected option
        if (sortBy === "fees") {
          return a.fees - b.fees; // Low to high
        } else if (sortBy === "experience") {
          // Ensure we're comparing numeric values and sorting in descending order
          return b.experience - a.experience; // High to low (fixed)
        }
        // Default sort by name if no sort option selected
        return a.name.localeCompare(b.name);
      });
  }, [doctors, searchQuery, consultationType, selectedSpecialties, sortBy]);

  // Get autocomplete suggestions
  const getAutocompleteSuggestions = (query: string): Doctor[] => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3); // Top 3 matches
  };

  return {
    doctors: filteredDoctors,
    loading,
    error,
    specialties,
    searchQuery,
    consultationType,
    selectedSpecialties,
    sortBy,
    updateFilters,
    getAutocompleteSuggestions,
  };
}