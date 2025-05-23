export interface Course {
  code: string;
  title: string;
  hours: number;
  ects: number;
  grade?: string;
  value?: number;
}

export interface Student {
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
  durationOfEducation: string;
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
  academicYear: string;
  typeOfEducation: string;
  previousTypeOfEducation: string;
  previousInstitution: string;
  department: string;
  photo: string;
  batchNumber: string;
  isInmate: boolean;
  inmateInfo?: {
    sentenceDuration: string;
    typeOfCrime: string;
    currentStatus: string;
    residingZone: string;
    imprisonmentStartDate: string;
    imprisonmentEndDateWithParole: string;
    imprisonmentEndDateWithoutParole: string;
  };
  languageOfInstruction: string;
  specialSupport?: string;
  courses?: Course[];
  gpa?: number;
  cgpa?: number;
  attendance?: {
    present?: number;
    absent?: number;
    totalDays?: number;
  };
}

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
  roundPhase: string;
  identificationNumber: string;
  typeOfEducation: string;
  previousTypeOfEducation: string;
  previousInstitution: string;
  department: string;
  photo: string;
};

export const mockStudents: Student[] = [
  {
    id: "ST001",
    title: "Mr",
    studentName: "Abebe",
    fatherName: "Kebede",
    grandfatherName: "Tadesse",
    gender: "male",
    motherName: "Almaz Mengistu",
    registrationDate: "2023-09-01",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0911234567",
    email: "abebe.kebede@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1998-05-12",
    age: 27,
    regionOfOrigin: "Amhara",
    zone: "North Shewa",
    district: "Debre Berhan",
    specificPlace: "Kebele 05",
    institutionName: "Addis Ababa University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Debre Berhan Secondary School",
    department: "Computer Science",
    photo: "https://i.pravatar.cc/150?img=11",
    batchNumber: "Batch 10",
    isInmate: true,
    inmateInfo: {
      sentenceDuration: "5 years",
      typeOfCrime: "Fraud",
      currentStatus: "Active",
      residingZone: "Zone B",
      imprisonmentStartDate: "2022-03-15",
      imprisonmentEndDateWithParole: "2026-03-15",
      imprisonmentEndDateWithoutParole: "2027-03-15"
    },
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'CS101', title: 'Introduction to Programming', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'MATH102', title: 'Calculus II', hours: 4, ects: 6, grade: 'B+', value: 21 },
      { code: 'PHYS101', title: 'General Physics I', hours: 3, ects: 5, grade: 'A-', value: 18.5 },
    ],
    gpa: 3.85,
    cgpa: 3.90,
    attendance: {
      present: 150,
      absent: 5,
      totalDays: 155,
    },
  },
  {
    id: "ST002",
    title: "Ms",
    studentName: "Tigist",
    fatherName: "Alemu",
    grandfatherName: "Bekele",
    gender: "female",
    motherName: "Mulu Gebre",
    registrationDate: "2023-09-02",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0922345678",
    email: "tigist.alemu@example.com",
    religion: "Protestant",
    nationality: "Ethiopian",
    dateOfBirth: "1999-08-23",
    age: 26,
    regionOfOrigin: "Oromia",
    zone: "East Shewa",
    district: "Adama",
    specificPlace: "Kebele 07",
    institutionName: "Jimma University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Adama Secondary School",
    department: "Law",
    photo: "https://i.pravatar.cc/150?img=31",
    batchNumber: "Batch 10",
    isInmate: true,
    inmateInfo: {
      sentenceDuration: "3 years",
      typeOfCrime: "Theft",
      currentStatus: "Active",
      residingZone: "Zone A",
      imprisonmentStartDate: "2023-01-10",
      imprisonmentEndDateWithParole: "2025-07-10",
      imprisonmentEndDateWithoutParole: "2026-01-10"
    },
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'LAW201', title: 'Criminal Law', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'POLS202', title: 'Political Science', hours: 3, ects: 5, grade: 'B+', value: 21 },
    ],
    gpa: 3.70,
    cgpa: 3.75,
    attendance: {
      present: 140,
      absent: 15,
      totalDays: 155,
    },
  },
  {
    id: "ST003",
    title: "Mr",
    studentName: "Mohammed",
    fatherName: "Ahmed",
    grandfatherName: "Ali",
    gender: "male",
    motherName: "Fatima Hussein",
    registrationDate: "2023-09-03",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0933456789",
    email: "mohammed.ahmed@example.com",
    religion: "Islam",
    nationality: "Ethiopian",
    dateOfBirth: "1997-11-05",
    age: 28,
    regionOfOrigin: "Somali",
    zone: "Fafan",
    district: "Jigjiga",
    specificPlace: "Kebele 03",
    institutionName: "Jigjiga University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Jigjiga Secondary School",
    department: "Business Administration",
    photo: "https://i.pravatar.cc/150?img=13",
    batchNumber: "Batch 10",
    isInmate: true,
    inmateInfo: {
      sentenceDuration: "4 years",
      typeOfCrime: "Assault",
      currentStatus: "Active",
      residingZone: "Zone C",
      imprisonmentStartDate: "2022-08-20",
      imprisonmentEndDateWithParole: "2025-08-20",
      imprisonmentEndDateWithoutParole: "2026-08-20"
    },
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'BA301', title: 'Marketing Principles', hours: 3, ects: 5, grade: 'B', value: 15 },
      { code: 'ECON302', title: 'Microeconomics', hours: 3, ects: 5, grade: 'B+', value: 21 },
    ],
    gpa: 3.50,
    cgpa: 3.55,
    attendance: {
      present: 155,
      absent: 0,
      totalDays: 155,
    },
  },
  {
    id: "ST004",
    title: "Mrs",
    studentName: "Sara",
    fatherName: "Tesfaye",
    grandfatherName: "Getachew",
    gender: "female",
    motherName: "Meseret Haile",
    registrationDate: "2023-09-04",
    educationStartDate: "2023-09-15",
    educationEndDate: "2024-07-30",
    durationOfEducation: "1 year",
    phoneNumber: "0944567890",
    email: "sara.tesfaye@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1995-02-18",
    age: 30,
    regionOfOrigin: "SNNPR",
    zone: "Sidama",
    district: "Hawassa",
    specificPlace: "Kebele 10",
    institutionName: "Hawassa University",
    academicYear: "2023/2024",
    typeOfEducation: "Certificate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Hawassa Secondary School",
    department: "Accounting",
    photo: "https://i.pravatar.cc/150?img=32",
    batchNumber: "Batch 11",
    isInmate: false,
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'ACC101', title: 'Intro to Accounting', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'FIN101', title: 'Intro to Finance', hours: 3, ects: 5, grade: 'A-', value: 22.5 },
    ],
    gpa: 4.00,
    cgpa: 4.00,
    attendance: {
      present: 100,
      absent: 2,
      totalDays: 102,
    },
  },
  {
    id: "ST005",
    title: "Mr",
    studentName: "Bekele",
    fatherName: "Girma",
    grandfatherName: "Degefa",
    gender: "male",
    motherName: "Abebech Demissie",
    registrationDate: "2023-09-05",
    educationStartDate: "2023-09-15",
    educationEndDate: "2025-07-30",
    durationOfEducation: "2 years",
    phoneNumber: "0955678901",
    email: "bekele.girma@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1996-07-30",
    age: 29,
    regionOfOrigin: "Oromia",
    zone: "West Shewa",
    district: "Ambo",
    specificPlace: "Kebele 02",
    institutionName: "Ambo University",
    academicYear: "2023/2024",
    typeOfEducation: "Diploma",
    previousTypeOfEducation: "High School",
    previousInstitution: "Ambo Secondary School",
    department: "Agriculture",
    photo: "https://i.pravatar.cc/150?img=15",
    batchNumber: "Batch 11",
    isInmate: false,
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'AGRI201', title: 'Soil Science', hours: 4, ects: 6, grade: 'B+', value: 21 },
      { code: 'CHEM202', title: 'Organic Chemistry', hours: 3, ects: 5, grade: 'A-', value: 18.5 },
    ],
    gpa: 3.60,
    cgpa: 3.65,
    attendance: {
      present: 200,
      absent: 10,
      totalDays: 210,
    },
  },
  {
    id: "ST006",
    title: "Ms",
    studentName: "Hawi",
    fatherName: "Tolosa",
    grandfatherName: "Gemechu",
    gender: "female",
    motherName: "Chaltu Negash",
    registrationDate: "2023-09-06",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0966789012",
    email: "hawi.tolosa@example.com",
    religion: "Protestant",
    nationality: "Ethiopian",
    dateOfBirth: "1999-04-01",
    age: 26,
    regionOfOrigin: "Oromia",
    zone: "West Hararghe",
    district: "Chiro",
    specificPlace: "Kebele 05",
    institutionName: "Haramaya University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Chiro Secondary School",
    department: "Economics",
    photo: "https://i.pravatar.cc/150?img=33",
    batchNumber: "Batch 12",
    isInmate: false,
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'ECON301', title: 'Macroeconomics', hours: 3, ects: 5, grade: 'A', value: 20 },
      { code: 'STAT302', title: 'Econometrics', hours: 4, ects: 6, grade: 'A-', value: 22.5 },
    ],
    gpa: 3.95,
    cgpa: 3.98,
    attendance: {
      present: 150,
      absent: 3,
      totalDays: 153,
    },
  },
  {
    id: "ST007",
    title: "Mr",
    studentName: "Samuel",
    fatherName: "Getachew",
    grandfatherName: "Molla",
    gender: "male",
    motherName: "Elifaz Hailu",
    registrationDate: "2023-09-07",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0977890123",
    email: "samuel.getachew@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1998-12-10",
    age: 27,
    regionOfOrigin: "Amhara",
    zone: "South Gondar",
    district: "Debre Tabor",
    specificPlace: "Kebele 02",
    institutionName: "Debre Tabor University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Debre Tabor Secondary School",
    department: "Physics",
    photo: "https://i.pravatar.cc/150?img=16",
    batchNumber: "Batch 12",
    isInmate: true,
    inmateInfo: {
      sentenceDuration: "6 years",
      typeOfCrime: "Fraud",
      currentStatus: "Active",
      residingZone: "Zone D",
      imprisonmentStartDate: "2022-01-05",
      imprisonmentEndDateWithParole: "2027-01-05",
      imprisonmentEndDateWithoutParole: "2028-01-05"
    },
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'PHYS301', title: 'Quantum Mechanics', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'MATH302', title: 'Differential Equations', hours: 3, ects: 5, grade: 'A-', value: 22.5 },
    ],
    gpa: 3.90,
    cgpa: 3.92,
    attendance: {
      present: 180,
      absent: 5,
      totalDays: 185,
    },
  },
  {
    id: "ST008",
    title: "Ms",
    studentName: "Chaltu",
    fatherName: "Kebede",
    grandfatherName: "Lemma",
    gender: "female",
    motherName: "Aster Mekonnen",
    registrationDate: "2023-09-08",
    educationStartDate: "2023-09-15",
    educationEndDate: "2025-07-30",
    durationOfEducation: "2 years",
    phoneNumber: "0988901234",
    email: "chaltu.kebede@example.com",
    religion: "Protestant",
    nationality: "Ethiopian",
    dateOfBirth: "1997-06-25",
    age: 28,
    regionOfOrigin: "Oromia",
    zone: "East Shewa",
    district: "Batu",
    specificPlace: "Kebele 01",
    institutionName: "Adama Science and Technology University",
    academicYear: "2023/2024",
    typeOfEducation: "Diploma",
    previousTypeOfEducation: "High School",
    previousInstitution: "Batu Secondary School",
    department: "Electrical Engineering",
    photo: "https://i.pravatar.cc/150?img=34",
    batchNumber: "Batch 13",
    isInmate: false,
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'EE301', title: 'Circuit Analysis', hours: 4, ects: 6, grade: 'A-', value: 22.5 },
      { code: 'MATH303', title: 'Linear Algebra', hours: 3, ects: 5, grade: 'B+', value: 17.5 },
    ],
    gpa: 3.70,
    cgpa: 3.72,
    attendance: {
      present: 200,
      absent: 0,
      totalDays: 200,
    },
  },
  {
    id: "ST009",
    title: "Mr",
    studentName: "Fitsum",
    fatherName: "Dereje",
    grandfatherName: "Wondimu",
    gender: "male",
    motherName: "Tiruwork Ayele",
    registrationDate: "2023-09-09",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0999012345",
    email: "fitsum.dereje@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1998-01-30",
    age: 27,
    regionOfOrigin: "Amhara",
    zone: "East Gojjam",
    district: "Debre Markos",
    specificPlace: "Kebele 04",
    institutionName: "Debre Markos University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Debre Markos Secondary School",
    department: "Chemistry",
    photo: "https://i.pravatar.cc/150?img=17",
    batchNumber: "Batch 13",
    isInmate: true,
    inmateInfo: {
      sentenceDuration: "3 years",
      typeOfCrime: "Theft",
      currentStatus: "Active",
      residingZone: "Zone E",
      imprisonmentStartDate: "2023-05-10",
      imprisonmentEndDateWithParole: "2025-11-10",
      imprisonmentEndDateWithoutParole: "2026-05-10"
    },
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'CHEM301', title: 'Physical Chemistry', hours: 3, ects: 5, grade: 'B', value: 15 },
      { code: 'BIOL302', title: 'Molecular Biology', hours: 3, ects: 5, grade: 'B+', value: 17.5 },
    ],
    gpa: 3.40,
    cgpa: 3.45,
    attendance: {
      present: 150,
      absent: 10,
      totalDays: 160,
    },
  },
  {
    id: "ST010",
    title: "Ms",
    studentName: "Lidiya",
    fatherName: "Gebru",
    grandfatherName: "Desta",
    gender: "female",
    motherName: "Hanna Mekonnen",
    registrationDate: "2023-09-10",
    educationStartDate: "2023-09-15",
    educationEndDate: "2025-07-30",
    durationOfEducation: "2 years",
    phoneNumber: "0910123456",
    email: "lidiya.gebru@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1996-03-20",
    age: 29,
    regionOfOrigin: "Tigray",
    zone: "Eastern Tigray",
    district: "Adigrat",
    specificPlace: "Kebele 06",
    institutionName: "Adigrat University",
    academicYear: "2023/2024",
    typeOfEducation: "Diploma",
    previousTypeOfEducation: "High School",
    previousInstitution: "Adigrat Secondary School",
    department: "Accounting",
    photo: "https://i.pravatar.cc/150?img=35",
    batchNumber: "Batch 14",
    isInmate: false,
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'ACC201', title: 'Intermediate Accounting', hours: 4, ects: 6, grade: 'B', value: 18 },
      { code: 'TAX202', title: 'Taxation', hours: 3, ects: 5, grade: 'B+', value: 17.5 },
    ],
    gpa: 3.50,
    cgpa: 3.52,
    attendance: {
      present: 200,
      absent: 5,
      totalDays: 205,
    },
  },
  {
    id: "ST011",
    title: "Mr",
    studentName: "Fitsum",
    fatherName: "Hailu",
    grandfatherName: "Mariam",
    gender: "male",
    motherName: "Aster Alemayehu",
    registrationDate: "2023-09-11",
    educationStartDate: "2023-09-15",
    educationEndDate: "2026-07-30",
    durationOfEducation: "3 years",
    phoneNumber: "0911212121",
    email: "fitsum.hailu@example.com",
    religion: "Orthodox",
    nationality: "Ethiopian",
    dateOfBirth: "1998-07-15",
    age: 27,
    regionOfOrigin: "Addis Ababa",
    zone: "N/A",
    district: "N/A",
    specificPlace: "Kebele 12",
    institutionName: "Addis Ababa University",
    academicYear: "2023/2024",
    typeOfEducation: "Undergraduate",
    previousTypeOfEducation: "High School",
    previousInstitution: "Menelik II Secondary School",
    department: "Software Engineering",
    photo: "https://i.pravatar.cc/150?img=18",
    batchNumber: "Batch 14",
    isInmate: true,
    inmateInfo: {
      sentenceDuration: "4 years",
      typeOfCrime: "Cyber Crime",
      currentStatus: "Active",
      residingZone: "Zone F",
      imprisonmentStartDate: "2022-06-01",
      imprisonmentEndDateWithParole: "2026-06-01",
      imprisonmentEndDateWithoutParole: "2027-06-01"
    },
    languageOfInstruction: "Amharic",
    specialSupport: "None",
    courses: [
      { code: 'SE301', title: 'Software Design', hours: 4, ects: 6, grade: 'A', value: 24 },
      { code: 'CS303', title: 'Data Structures and Algorithms', hours: 4, ects: 6, grade: 'A-', value: 22.5 },
    ],
    gpa: 3.88,
    cgpa: 3.90,
    attendance: {
      present: 170,
      absent: 2,
      totalDays: 172,
    },
  },
];

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
  },
];