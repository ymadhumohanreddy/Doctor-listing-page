
import { Doctor } from "@/types/doctor";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
    
    if (!response.ok) {
      throw new Error("Failed to fetch doctor data");
    }
    
    const data = await response.json();
    return data.map((doctor: any) => ({
      id: doctor.id || String(Math.random()),
      name: doctor.name || "",
      specialties: doctor.specialities?.map((s: any) => s.name) || [],
      qualifications: doctor.qualifications || "",
      experience: parseInt(doctor.experience) || 0,
      fees: parseInt(doctor.fees?.replace(/[^0-9]/g, "")) || 0,
      location: doctor.clinic?.address?.locality || "",
      clinicName: doctor.clinic?.name || "",
      consultationType: [
        ...(doctor.video_consult ? ["Video Consult"] : []),
        ...(doctor.in_clinic ? ["In Clinic"] : []),
      ],
      avatarUrl: doctor.photo || null,
      name_initials: doctor.name_initials || doctor.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "",
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}
