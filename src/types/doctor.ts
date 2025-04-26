
export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  qualifications: string;
  experience: number; 
  fees: number;
  location: string;
  clinicName: string;
  consultationType: string[];
  avatarUrl?: string;
  name_initials?: string;
  photo?: string;
}
