import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { mockStudents, Student } from '../../data/mockStudents';
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, User, Calendar, Flag, BookOpen, Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import RegistrationSlip from '../../components/common/RegistrationSlip';
import GradeReport from '../../components/common/GradeReport';
import * as htmlToImage from 'html-to-image';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RegistrationSlipPDF from './RegistrationSlipPDF';
import GradeReportPDF from './GradeReportPDF';
import { Button } from '@mui/material';
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

const StudentDetails: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
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
    if (!student) return;
    
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
      link.download = `GradeReport-${student.id}.png`;
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
      const foundStudent = mockStudents.find(s => s.id === id);
      setStudent(foundStudent || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6">
        <PageHeader 
          title={t('students.details')} 
          subtitle={t('common.loading')}
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

  if (!student) {
    return (
      <div className="p-6">
        <PageHeader 
          title={t('students.details')} 
          subtitle={t('common.notFound')}
        />
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">{t('students.studentNotFound')}</p>
          <button
            onClick={() => navigate('/students')}
            className="mt-4 btn btn-primary flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            {t('common.backToList')}
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
        title={t('students.details')} 
        subtitle={`${t('students.id')}: ${student.id}`}
      >
        <button
          onClick={() => navigate('/students')}
          className="btn btn-outline flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t('common.backToList')}
        </button>
        <div className="mt-4 space-y-2">
          {student && (
            <>
              <PDFDownloadLink
                document={<RegistrationSlipPDF />}
                fileName={`RegistrationSlip.pdf`}
              >
                {({ loading }) => (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                    disabled={loading}
                    fullWidth
                  >
                    {loading ? 'Generating PDF...' : 'Download Registration Slip'}
                  </Button>
                )}
              </PDFDownloadLink>
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
            </>
          )}
        </div>
      </PageHeader>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="h-32 w-32 rounded-full bg-gray-200 flex-shrink-0 mb-4">
                {student.photo ? (
                  <img src={student.photo} alt={student.studentName} className="h-32 w-32 rounded-full object-cover" />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl">
                    {student.studentName.charAt(0)}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {student.title} {student.studentName} {student.fatherName}
              </h2>
              <p className="text-sm text-gray-500">{student.department}</p>
            </div>

            <div className="space-y-4">
              <InfoItem icon={User} label={t('students.gender')} value={student.gender} />
              <InfoItem icon={Calendar} label={t('students.dateOfBirth')} value={student.dateOfBirth} />
              <InfoItem icon={User} label={t('students.motherName')} value={student.motherName} />
              <InfoItem icon={User} label={t('students.grandfatherName')} value={student.grandfatherName} />
              <InfoItem icon={Flag} label={t('students.nationality')} value={student.nationality} />
              <InfoItem icon={BookOpen} label={t('students.religion')} value={student.religion} />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">{t('students.contactInfo')}</h3>
              <div className="space-y-4">
                <InfoItem icon={Phone} label={t('students.phone')} value={student.phoneNumber} />
                <InfoItem icon={Mail} label={t('students.email')} value={student.email} />
                <InfoItem 
                  icon={MapPin} 
                  label={t('students.address')} 
                  value={`${student.regionOfOrigin}, ${student.zone}, ${student.district}, ${student.specificPlace}`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Academic and Inmate Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <GraduationCap size={16} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('students.academicInfo')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={BookOpen} label={t('students.department')} value={student.department} />
              <InfoItem icon={GraduationCap} label={t('students.typeOfEducation')} value={student.typeOfEducation} />
              <InfoItem icon={User} label={t('students.batchNumber')} value={student.batchNumber} />
              <InfoItem icon={Calendar} label={t('students.academicYear')} value={student.academicYear} />
              <InfoItem icon={Calendar} label={t('students.registrationDate')} value={student.registrationDate} />
              <InfoItem icon={Calendar} label={t('students.durationOfEducation')} value={student.durationOfEducation} />
            </div>
          </div>

          {/* Inmate Information */}
          {student.isInmate && student.inmateInfo && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                  <User size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('students.inmateInfo')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  icon={Calendar} 
                  label={t('students.sentenceDuration')} 
                  value={student.inmateInfo.sentenceDuration} 
                />
                <InfoItem 
                  icon={BookOpen} 
                  label={t('students.typeOfCrime')} 
                  value={student.inmateInfo.typeOfCrime} 
                />
                <InfoItem 
                  icon={User} 
                  label={t('students.currentStatus')} 
                  value={student.inmateInfo.currentStatus} 
                />
                <InfoItem 
                  icon={MapPin} 
                  label={t('students.residingZone')} 
                  value={student.inmateInfo.residingZone} 
                />
                <InfoItem 
                  icon={Calendar} 
                  label={t('students.imprisonmentStartDate')} 
                  value={student.inmateInfo.imprisonmentStartDate} 
                />
                <InfoItem 
                  icon={Calendar} 
                  label={t('students.imprisonmentEndDateWithParole')} 
                  value={student.inmateInfo.imprisonmentEndDateWithParole} 
                />
                <InfoItem 
                  icon={Calendar} 
                  label={t('students.imprisonmentEndDateWithoutParole')} 
                  value={student.inmateInfo.imprisonmentEndDateWithoutParole} 
                />
              </div>
            </div>
          )}

          {/* Personal Info */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={16} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('students.personalInfo')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={User} label={t('students.fullName')} value={`${student.title} ${student.studentName} ${student.fatherName}`} />
              <InfoItem icon={GraduationCap} label={t('students.department')} value={student.department} />
              <InfoItem icon={Calendar} label={t('students.registrationDate')} value={student.registrationDate} />
              <InfoItem icon={Mail} label={t('common.email')} value={student.email} />
              <InfoItem icon={Phone} label={t('common.phone')} value={student.phoneNumber} />
              <InfoItem icon={MapPin} label={t('common.address')} value={`${student.regionOfOrigin}, ${student.zone}, ${student.district}, ${student.specificPlace}`} />
              <InfoItem icon={Flag} label={t('students.nationality')} value={student.nationality} />
              <InfoItem icon={BookOpen} label={t('students.religion')} value={student.religion} />
            </div>
          </div>

          {/* Current Enrolled Courses */}
          {student.courses && student.courses.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <BookOpen size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('students.enrolledCourses')}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {student.courses.map(course => (
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
          {(student.gpa !== undefined || student.cgpa !== undefined) && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('students.academicStatus')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {student.gpa !== undefined && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">{t('students.gpa')}</p>
                    <p className="text-2xl font-semibold text-gray-900">{student.gpa?.toFixed(2)}</p>
                  </div>
                )}
                {student.cgpa !== undefined && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">{t('students.cgpa')}</p>
                    <p className="text-2xl font-semibold text-gray-900">{student.cgpa?.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attendance Status */}
          {student?.attendance && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={16} /> {/* Using a generic user icon, can change later if needed */}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('students.attendanceStatus') || 'Attendance Status'}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">{t('students.present') || 'Present'}</p>
                  <p className="text-2xl font-semibold text-green-600">{student.attendance.present ?? 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">{t('students.absent') || 'Absent'}</p>
                  <p className="text-2xl font-semibold text-red-600">{student.attendance.absent ?? 'N/A'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">{t('students.percentage') || 'Percentage'}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {student.attendance.present !== undefined && student.attendance.totalDays !== undefined && student.attendance.totalDays > 0
                      ? `${((student.attendance.present / student.attendance.totalDays) * 100).toFixed(2)}%`
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

export default StudentDetails;