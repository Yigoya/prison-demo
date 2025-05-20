export type Member = {
  id: string;
  title: string;
  studentName: string;
  fatherName: string;
  grandfatherName: string;
  gender: 'male' | 'female' | 'other';
  motherName: string;
  registrationDate: string;
  educationStartDate: string;
  educationEndDate: string;
  durationOfStudy: string;
  phoneNumber: string;
  email: string;
  religion: string;
  nationality: string;
  dateOfBirth: string;
  age: number;
  regionOfOrigin: string;
  zone: string;
  district: string;
  specificPlace: string;
  institutionName: string;
  employmentPeriod: string;
  typeOfEducation: string;
  previousTypeOfEducation: string;
  previousInstitution: string;
  department: string;
  photo: string;
  roundPhase: string;
  identificationNumber: string;
};

export const mockMembers: Member[] = [
  {
    id: "M001",
    title: "Dr",
    studentName: "John",
    fatherName: "Smith",
    grandfatherName: "William",
    gender: "male",
    motherName: "Mary Johnson",
    registrationDate: "2023-09-01",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfStudy: "3 years",
    phoneNumber: "0911234567",
    email: "john.smith@example.com",
    religion: "Christian",
    nationality: "Ethiopian",
    dateOfBirth: "1985-05-12",
    age: 38,
    regionOfOrigin: "Addis Ababa",
    zone: "Central",
    district: "Kirkos",
    specificPlace: "Kebele 05",
    institutionName: "Addis Ababa University",
    employmentPeriod: "2020-Present",
    typeOfEducation: "PhD",
    previousTypeOfEducation: "Masters",
    previousInstitution: "University of London",
    department: "Computer Science",
    photo: "https://i.pravatar.cc/150?img=1",
    roundPhase: "Phase 1",
    identificationNumber: "ID123456"
  },
  {
    id: "M002",
    title: "Prof",
    studentName: "Sarah",
    fatherName: "Brown",
    grandfatherName: "James",
    gender: "female",
    motherName: "Elizabeth Brown",
    registrationDate: "2023-09-02",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfStudy: "3 years",
    phoneNumber: "0922345678",
    email: "sarah.brown@example.com",
    religion: "Christian",
    nationality: "Ethiopian",
    dateOfBirth: "1980-08-23",
    age: 43,
    regionOfOrigin: "Oromia",
    zone: "East Shewa",
    district: "Adama",
    specificPlace: "Kebele 07",
    institutionName: "Jimma University",
    employmentPeriod: "2018-Present",
    typeOfEducation: "PhD",
    previousTypeOfEducation: "Masters",
    previousInstitution: "Harvard University",
    department: "Law",
    photo: "https://i.pravatar.cc/150?img=5",
    roundPhase: "Phase 1",
    identificationNumber: "ID123457"
  }
]; 