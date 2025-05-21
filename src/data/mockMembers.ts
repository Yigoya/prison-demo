import { Course } from './mockStudents';

export interface Member {
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
  roundPhase: string;
  identificationNumber: string;
  typeOfEducation: string;
  previousTypeOfEducation: string;
  previousInstitution: string;
  department: string;
  photo: string;
  courses?: Course[];
  gpa?: number;
  cgpa?: number;
  attendance?: {
    present?: number;
    absent?: number;
    totalDays?: number;
  };
}

export const mockMembers: Member[] = [
  {
    id: "MB001",
    title: "Mr",
    studentName: "Yohannes",
    fatherName: "Gebre",
    grandfatherName: "Mariam",
    gender: "male",
    motherName: "Tiruwork Assefa",
    registrationDate: "2023-09-15",
    educationStartDate: "2023-09-15",
    educationEndDate: "2025-09-15",
    durationOfStudy: "2 years",
    phoneNumber: "0911345678",
    email: "yohannes.gebre@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1990-01-20",
    age: 35,
    regionOfOrigin: "Oromia",
    zone: "East Shewa",
    district: "Adama",
    specificPlace: "Kebele 01",
    institutionName: "Adama Police College",
    employmentPeriod: "2015-Present",
    roundPhase: "Round 1",
    identificationNumber: "MBID001",
    typeOfEducation: "Diploma",
    previousTypeOfEducation: "High School",
    previousInstitution: "Adama High School",
    department: "Patrol",
    photo: "https://i.pravatar.cc/150?img=20",
    courses: [
      { code: 'CRIM101', title: 'Introduction to Criminal Law', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'FORN201', title: 'Forensic Science', hours: 3, ects: 5, grade: 'A-', value: 22.5 },
      { code: 'INV301', title: 'Criminal Investigation', hours: 4, ects: 6, grade: 'B+', value: 21 },
    ],
    gpa: 3.85,
    cgpa: 3.90,
    attendance: {
      present: 120,
      absent: 3,
      totalDays: 123,
    },
  },
  {
    id: "MB002",
    title: "Ms",
    studentName: "Fikirte",
    fatherName: "Tadesse",
    grandfatherName: "Lemma",
    gender: "female",
    motherName: "Abebech Kebede",
    registrationDate: "2023-09-16",
    educationStartDate: "2023-09-16",
    educationEndDate: "2025-09-16",
    durationOfStudy: "2 years",
    phoneNumber: "0922456789",
    email: "fikirte.tadesse@example.com",
    religion: "Protestant",
    nationality: "Ethiopian",
    dateOfBirth: "1992-05-10",
    age: 33,
    regionOfOrigin: "Amhara",
    zone: "North Shewa",
    district: "Debre Berhan",
    specificPlace: "Kebele 02",
    institutionName: "Debre Berhan Police College",
    employmentPeriod: "2017-Present",
    roundPhase: "Round 1",
    identificationNumber: "MBID002",
    typeOfEducation: "Diploma",
    previousTypeOfEducation: "High School",
    previousInstitution: "Debre Berhan High School",
    department: "Investigation",
    photo: "https://i.pravatar.cc/150?img=40",
    courses: [
      { code: 'CRIM201', title: 'Advanced Criminal Law', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'PSYCH202', title: 'Criminal Psychology', hours: 3, ects: 5, grade: 'B+', value: 21 },
    ],
    gpa: 3.70,
    cgpa: 3.75,
    attendance: {
      present: 110,
      absent: 8,
      totalDays: 118,
    },
  },
  {
    id: "MB003",
    title: "Mr",
    studentName: "Lemma",
    fatherName: "Abebe",
    grandfatherName: "Tola",
    gender: "male",
    motherName: "Hirut Worku",
    registrationDate: "2023-09-17",
    educationStartDate: "2023-09-17",
    educationEndDate: "2025-09-17",
    durationOfStudy: "2 years",
    phoneNumber: "0933567890",
    email: "lemma.abebe@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1991-11-25",
    age: 34,
    regionOfOrigin: "SNNPR",
    zone: "Sidama",
    district: "Hawassa",
    specificPlace: "Kebele 03",
    institutionName: "Hawassa Police College",
    employmentPeriod: "2016-Present",
    roundPhase: "Round 1",
    identificationNumber: "MBID003",
    typeOfEducation: "Diploma",
    previousTypeOfEducation: "High School",
    previousInstitution: "Hawassa High School",
    department: "Traffic Police",
    photo: "https://i.pravatar.cc/150?img=21",
    courses: [
      { code: 'TRAF301', title: 'Traffic Management', hours: 3, ects: 5, grade: 'B', value: 15 },
      { code: 'LAW302', title: 'Traffic Laws', hours: 3, ects: 5, grade: 'B+', value: 17.5 },
    ],
    gpa: 3.50,
    cgpa: 3.55,
    attendance: {
      present: 123,
      absent: 0,
      totalDays: 123,
    },
  },
]; 