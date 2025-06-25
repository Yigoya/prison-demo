import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { mockMembers, Member } from '../../data/mockMembers';
import { mockStudents, Student } from '../../data/mockStudents';

import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, User, Calendar, Flag, BookOpen, Briefcase, Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import RegistrationSlip from '../../components/common/RegistrationSlip';
import GradeReport from '../../components/common/GradeReport';
import * as htmlToImage from 'html-to-image';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GradeReportPDF from '../../features/students/GradeReportPDF';
import { Button, Grid } from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';

const mockGrades = [
  { code: 'Math1011', title: 'Basic Mathematics for Natural Science', hours: 101, ects: 5, grade: 'B+', value: 17.5 },
  { code: 'EnLa1011', title: 'Communicative English Skill-I', hours: 101, ects: 5, grade: 'A', value: 20 },
  { code: 'Mgmt1211', title: 'Introduction to Management', hours: 101, ects: 5, grade: 'A+', value: 20 },
  { code: 'Psch1011', title: 'General Psychology and Life Skills', hours: 101, ects: 5, grade: 'A+', value: 20 },
  { code: 'LOCT1011', title: 'Logic and Critical Thinking', hours: 101, ects: 5, grade: 'A+', value: 20 },
];
const mockAverage = 3.73;
const mockTotalEcts = 25;
const mockTotalValue = 97.5;
const mockDateIssued = 'Feb 04, 2025';

const MemberDetails: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!src) {
        resolve();
        return;
      }
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error
      img.src = src;
    });
  };

  const waitForImages = async (element: HTMLElement): Promise<void> => {
    const images = element.getElementsByTagName('img');
    const imagePromises = Array.from(images).map(img => {
      if (!img.src) return Promise.resolve();
      return preloadImage(img.src);
    });
    await Promise.all(imagePromises);
  };

  const handleDownloadGradePng = async () => {
    if (!member) return;
    
    try {
      setIsDownloading(true);
      
      // Create a temporary container for capturing
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Clone the element and append to container
      const clone = document.querySelector('.grade-report') as HTMLElement;
      if (!clone) {
        throw new Error('Grade report element not found');
      }
      
      // Remove any problematic images
      const images = clone.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        if (img.classList.contains('h-16') && img.classList.contains('mb-2')) {
          img.remove();
        }
      });

      // Set styles
      clone.style.position = 'relative';
      clone.style.left = '0';
      clone.style.top = '0';
      clone.style.width = '800px';
      clone.style.backgroundColor = 'white';
      clone.style.padding = '20px';
      clone.style.margin = '0';
      container.appendChild(clone);

      // Wait for all images to load
      await waitForImages(clone);

      // Ensure the element is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      // Convert to PNG
      const dataUrl = await htmlToImage.toPng(clone, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: 'white',
        width: 800,
        height: clone.offsetHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        skipFonts: true,
        skipAutoScale: true,
        imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        filter: (node) => {
          // Skip problematic images
          if (node instanceof HTMLImageElement) {
            return !(node.classList.contains('h-16') && node.classList.contains('mb-2'));
          }
          return true;
        }
      });

      // Create and trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `GradeReport-${member.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      container.removeChild(clone);
      document.body.removeChild(container);
    } catch (error) {
      console.error('Failed to download grade report:', error);
      alert('Failed to download grade report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundMember = mockMembers.find(m => m.id === id);
      setMember(foundMember || null);
      
      // Create a student object from member data
      if (foundMember) {
        const studentData: Student = {
          ...foundMember,
          studentName: foundMember.studentName,
          durationOfEducation: foundMember.durationOfStudy,
          academicYear: foundMember.educationStartDate.split('-')[0] + '/' + foundMember.educationEndDate.split('-')[0],
          typeOfEducation: foundMember.typeOfEducation,
          previousTypeOfEducation: foundMember.previousTypeOfEducation,
          previousInstitution: foundMember.previousInstitution,
          department: foundMember.department,
          photo: foundMember.photo,
          batchNumber: foundMember.roundPhase,
          isInmate: false,
          languageOfInstruction: 'Amharic',
          specialSupport: 'None',
          courses: foundMember.courses,
          gpa: foundMember.gpa,
          cgpa: foundMember.cgpa
        };
        setStudent(studentData);
      }
      
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6">
        <PageHeader 
          title={'Member Details'} 
          subtitle={'Loading...'}
        />
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-6">
        <PageHeader 
          title={'Member Details'} 
          subtitle={'Not Found'}
        />
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">{'Member not found'}</p>
          <button
            onClick={() => navigate('/members')}
            className="mt-4 btn btn-primary flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            {'Back to List'}
          </button>
        </div>
      </div>
    );
  }

  const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <PageHeader 
        title={'Member Details'} 
        subtitle={`ID: ${member.id}`}
      >
        <button
          onClick={() => navigate('/members')}
          className="btn btn-outline flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          {'Back to List'}
        </button>
        <div className="mt-4">
          {student && (
            <PDFDownloadLink
              document={<GradeReportPDF />}
              fileName={`GradeReport.pdf`}
            >
              {({ loading }) => (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PrintIcon />}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Generating PDF...' : 'Download Grade Report'}
                </Button>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </PageHeader>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="h-32 w-32 rounded-full bg-gray-200 flex-shrink-0 mb-4">
                {member.photo ? (
                  <img src={member.photo} alt={member.studentName} className="h-32 w-32 rounded-full object-cover" />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl">
                    {member.studentName.charAt(0)}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {member.title} {member.studentName} {member.fatherName}
              </h2>
              <p className="text-sm text-gray-500">{member.department}</p>
            </div>

            <div className="space-y-4">
              <InfoItem icon={User} label={'Gender'} value={member.gender} />
              <InfoItem icon={Calendar} label={'Date of Birth'} value={member.dateOfBirth} />
              <InfoItem icon={User} label={"Mother's Name"} value={member.motherName} />
              <InfoItem icon={User} label={"Grandfather's Name"} value={member.grandfatherName} />
              <InfoItem icon={Flag} label={'Nationality'} value={member.nationality} />
              <InfoItem icon={BookOpen} label={'Religion'} value={member.religion} />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">{'Contact Information'}</h3>
              <div className="space-y-4">
                <InfoItem icon={Phone} label={'Phone'} value={member.phoneNumber} />
                <InfoItem icon={Mail} label={'Email'} value={member.email} />
                <InfoItem 
                  icon={MapPin} 
                  label={'Address'} 
                  value={`${member.regionOfOrigin}, ${member.zone}, ${member.district}, ${member.specificPlace}`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Education and Employment Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Education Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <GraduationCap size={16} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{'Education Information'}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={BookOpen} label={'Department'} value={member.department} />
              <InfoItem icon={GraduationCap} label={'Type of Education'} value={member.typeOfEducation} />
              <InfoItem icon={BookOpen} label={'Previous Type of Education'} value={member.previousTypeOfEducation} />
              <InfoItem icon={BookOpen} label={'Previous Institution'} value={member.previousInstitution} />
              <InfoItem icon={Calendar} label={'Registration Date'} value={member.registrationDate} />
              <InfoItem icon={Calendar} label={'Education Start Date'} value={member.educationStartDate} />
              <InfoItem icon={Calendar} label={'Education End Date'} value={member.educationEndDate} />
              <InfoItem icon={Calendar} label={'Duration of Study'} value={member.durationOfStudy} />
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <Briefcase size={16} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{'Employment Information'}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={Calendar} label={'Employment Period'} value={member.employmentPeriod} />
              <InfoItem icon={User} label={'Round/Phase'} value={member.roundPhase} />
              <InfoItem icon={User} label={'Identification Number'} value={member.identificationNumber} />
            </div>
          </div>

          {/* Current Enrolled Courses */}
          {member?.courses && member.courses.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <BookOpen size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{"Enrolled Courses"}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {member.courses.map(course => (
                  <div key={course.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-500">{course.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{course.hours} hours</p>
                      <p className="text-sm text-gray-500">{course.ects} ECTS</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Status */}
          {(member?.gpa !== undefined || member?.cgpa !== undefined) && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{"Academic Status"}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {member.gpa !== undefined && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">{'GPA'}</p>
                    <p className="text-2xl font-semibold text-gray-900">{member.gpa?.toFixed(2)}</p>
                  </div>
                )}
                {member.cgpa !== undefined && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">{'CGPA'}</p>
                    <p className="text-2xl font-semibold text-gray-900">{member.cgpa?.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attendance Status */}
          {member?.attendance && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={16} /> {/* Using a generic user icon, can change later if needed */}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{"Attendance Status"}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">{"Present"}</p>
                  <p className="text-2xl font-semibold text-green-600">{member.attendance.present ?? 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">{"Absent"}</p>
                  <p className="text-2xl font-semibold text-red-600">{member.attendance.absent ?? 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">{"Percentage"}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {member.attendance.present !== undefined && member.attendance.totalDays !== undefined && member.attendance.totalDays > 0
                      ? `${((member.attendance.present / member.attendance.totalDays) * 100).toFixed(2)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reports Section */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 hidden grade-report">
            {/* The GradeReport component is hidden and used for PNG generation */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails; 