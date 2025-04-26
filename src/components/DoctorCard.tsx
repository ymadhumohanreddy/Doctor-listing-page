import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doctor } from "../types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const specialtiesToShow = doctor.specialties.length > 0 ? doctor.specialties : ['General Physician'];
  const avatarUrl = doctor.avatarUrl || doctor.photo;

  return (
    <Card 
      className="mb-4 overflow-hidden transition-all duration-200 hover:scale-105 hover:border-blue-300" 
      data-testid="doctor-card"
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Left section: Avatar + Info */}
          <div className="flex flex-1 gap-4">
            {/* Doctor's avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-20 w-20" aria-label={`${doctor.name}'s profile picture`}>
                {avatarUrl && (
                  <AvatarImage 
                    src={avatarUrl} 
                    alt={doctor.name}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-lg bg-blue-100 text-blue-800">
                  {doctor.name_initials || getInitials(doctor.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Doctor's details */}
            <div className="flex-grow">
              {/* Name, specialty, qualifications */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1" data-testid="doctor-name">
                  Dr. {doctor.name}
                </h3>
                <p className="text-gray-600" data-testid="doctor-specialty">
                  {(doctor.specialties || []).join(", ")}
                </p>
                <p className="text-gray-500">{doctor.qualifications}</p>
              </div>

              {/* Experience */}
              <div className="mt-2">
                <p className="text-sm text-gray-600" data-testid="doctor-experience">
                  <span className="font-medium">{doctor.experience} years</span> of experience
                </p>
              </div>

              {/* Consultation types (MOC) */}
              <div className="flex flex-wrap gap-2 mt-2">
                {(doctor.consultationType || []).map((mode, index) => (
                  <span
                    key={index}
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-xl shadow-sm leading-none ${
                      mode === "Video Consult"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    {mode}
                  </span>
                ))}
              </div>

              {/* Clinic name and location */}
              <div className="text-sm text-gray-600 mt-2">
                {doctor.clinicName} • {doctor.location}
              </div>
            </div>
          </div>

          {/* Right section: Fee + Book button */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-right w-full">
              <p className="text-lg font-semibold" data-testid="doctor-fee">
                ₹{doctor.fees}
              </p>
            </div>
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200 text-sm font-medium w-full"
              aria-label="Book appointment"
            >
              Book
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}