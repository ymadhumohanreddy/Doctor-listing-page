
import React from 'react';
import { Doctor } from '../services/doctorApi';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Doctor's avatar/image section */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
          <div className="w-20 h-20 bg-medical-100 rounded-full flex items-center justify-center text-medical-700 text-xl font-semibold">
            {doctor.name.substring(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Doctor's details section */}
        <div className="flex-grow">
          <h2 data-testid="doctor-name" className="text-xl font-bold text-gray-800 mb-1">
            Dr. {doctor.name}
          </h2>
          
          <div data-testid="doctor-specialty" className="text-sm text-gray-600 mb-2">
            {doctor.speciality.join(', ')}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-3">
            <div data-testid="doctor-experience" className="flex items-center">
              <span className="text-gray-500 text-sm">Experience:</span>
              <span className="ml-1 text-gray-800 font-medium text-sm">{doctor.experience}</span>
            </div>
            
            <div data-testid="doctor-fee" className="flex items-center">
              <span className="text-gray-500 text-sm">Fee:</span>
              <span className="ml-1 text-gray-800 font-medium text-sm">₹{doctor.fee}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {doctor.moc.map((mode, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 text-xs rounded-full ${
                  mode === "Video Consult" 
                    ? "bg-green-100 text-green-800 border border-green-300" 
                    : "bg-blue-100 text-blue-800 border border-blue-300"
                }`}
              >
                {mode}
              </span>
            ))}
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            {doctor.hospital} • {doctor.area}, {doctor.city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
