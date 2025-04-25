
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface QueryParams {
  search?: string;
  consultationType?: string;
  specialties?: string[];
  sortBy?: string;
}

export const useQueryParams = (initialParams: QueryParams = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useState<QueryParams>(initialParams);

  // Parse URL parameters on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlParams: QueryParams = {};

    const search = searchParams.get('search');
    if (search) urlParams.search = search;

    const consultationType = searchParams.get('consultationType');
    if (consultationType) urlParams.consultationType = consultationType;

    const specialtiesParam = searchParams.get('specialties');
    if (specialtiesParam) {
      urlParams.specialties = specialtiesParam.split(',');
    }

    const sortBy = searchParams.get('sortBy');
    if (sortBy) urlParams.sortBy = sortBy;

    setParams({ ...initialParams, ...urlParams });
  }, [location.search, initialParams]);

  // Update URL when params change
  const updateParams = (newParams: Partial<QueryParams>) => {
    const updatedParams = { ...params, ...newParams };
    
    // Remove undefined or empty values
    Object.keys(updatedParams).forEach(key => {
      if (updatedParams[key as keyof QueryParams] === undefined || 
         (Array.isArray(updatedParams[key as keyof QueryParams]) && 
          (updatedParams[key as keyof QueryParams] as any).length === 0)) {
        delete updatedParams[key as keyof QueryParams];
      }
    });

    setParams(updatedParams);

    // Update URL
    const searchParams = new URLSearchParams();
    
    if (updatedParams.search) searchParams.set('search', updatedParams.search);
    if (updatedParams.consultationType) searchParams.set('consultationType', updatedParams.consultationType);
    if (updatedParams.specialties && updatedParams.specialties.length > 0) {
      searchParams.set('specialties', updatedParams.specialties.join(','));
    }
    if (updatedParams.sortBy) searchParams.set('sortBy', updatedParams.sortBy);
    
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return { params, updateParams };
};
