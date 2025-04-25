
// Define the Doctor interface
export interface Doctor {
  id: string;
  name: string;
  city: string;
  speciality: string[];
  fee: number;
  moc: string[];
  hospital: string;
  area: string;
  gender: string;
  registration_no: string;
  experience: string;
}

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctor data');
    }
    
    const data = await response.json();
    
    // Transform the API response to match our Doctor interface
    const doctors: Doctor[] = data.map((item: any) => {
      return {
        id: item.id || '',
        name: item.name || '',
        city: item.clinic?.address?.city || '',
        speciality: item.specialities ? item.specialities.map((s: any) => s.name) : [],
        fee: parseInt(item.fees?.replace(/[^\d]/g, '') || '0'),
        moc: [
          item.video_consult ? 'Video Consult' : null,
          item.in_clinic ? 'In Clinic' : null
        ].filter(Boolean) as string[],
        hospital: item.clinic?.name || '',
        area: item.clinic?.address?.locality || '',
        gender: '', // Not available in the API
        registration_no: '', // Not available in the API
        experience: item.experience || ''
      };
    });
    
    return doctors;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Get unique specialties from all doctors
export const getUniqueSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.speciality.forEach(specialty => {
      specialtiesSet.add(specialty);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};
