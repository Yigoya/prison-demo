import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { mockMembers, Member } from '../../data/mockMembers';
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, User, Calendar, Flag, BookOpen, Briefcase, Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import RegistrationSlip from '../../components/common/RegistrationSlip';
import GradeReport from '../../components/common/GradeReport';
import * as htmlToImage from 'html-to-image';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);
  const gradeRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => slipRef.current,
    documentTitle: `RegistrationSlip-${member?.id}`,
    // @ts-ignore
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    onPrintError: () => {
      setIsPrinting(false);
      alert('Failed to print registration slip. Please try again.');
    }
  });

  const handlePrintGrade = useReactToPrint({
    // @ts-ignore
    content: () => gradeRef.current,
    documentTitle: `GradeReport-${member?.id}`,
    // @ts-ignore
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    onPrintError: () => {
      setIsPrinting(false);
      alert('Failed to print grade report. Please try again.');
    }
  });

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
    if (!gradeRef.current || !member) return;
    
    try {
      setIsDownloading(true);
      
      // Create a temporary container for capturing
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Clone the element and append to container
      const clone = gradeRef.current.cloneNode(true) as HTMLElement;
      
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
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6">
        <PageHeader 
          title={t('members.details')} 
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

  if (!member) {
    return (
      <div className="p-6">
        <PageHeader 
          title={t('members.details')} 
          subtitle={t('common.notFound')}
        />
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">{t('members.memberNotFound')}</p>
          <button
            onClick={() => navigate('/members')}
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
        title={t('members.details')} 
        subtitle={`${t('members.id')}: ${member.id}`}
      >
        <button
          onClick={() => navigate('/members')}
          className="btn btn-outline flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t('common.backToList')}
        </button>
        <button
          onClick={handlePrint}
          className="btn btn-secondary ml-2"
          disabled={isPrinting}
        >
          <Printer size={16} className="mr-1" />
          {isPrinting ? 'Printing...' : 'Print Slip'}
        </button>
        <button
          onClick={handlePrintGrade}
          className="btn btn-secondary ml-2"
          disabled={isPrinting}
        >
          <Printer size={16} className="mr-1" />
          {isPrinting ? 'Printing...' : 'Print Grade Report'}
        </button>
        <button
          onClick={handleDownloadGradePng}
          className="btn btn-primary ml-2"
          disabled={isDownloading}
        >
          <Download size={16} className="mr-1" />
          {isDownloading ? 'Downloading...' : 'Download Grade Report (PNG)'}
        </button>
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
              <InfoItem icon={User} label={t('members.gender')} value={member.gender} />
              <InfoItem icon={Calendar} label={t('members.dateOfBirth')} value={member.dateOfBirth} />
              <InfoItem icon={User} label={t('members.motherName')} value={member.motherName} />
              <InfoItem icon={User} label={t('members.grandfatherName')} value={member.grandfatherName} />
              <InfoItem icon={Flag} label={t('members.nationality')} value={member.nationality} />
              <InfoItem icon={BookOpen} label={t('members.religion')} value={member.religion} />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">{t('members.contactInfo')}</h3>
              <div className="space-y-4">
                <InfoItem icon={Phone} label={t('members.phone')} value={member.phoneNumber} />
                <InfoItem icon={Mail} label={t('members.email')} value={member.email} />
                <InfoItem 
                  icon={MapPin} 
                  label={t('members.address')} 
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
              <h3 className="text-lg font-semibold text-gray-900">{t('members.educationInfo')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={BookOpen} label={t('members.department')} value={member.department} />
              <InfoItem icon={GraduationCap} label={t('members.typeOfEducation')} value={member.typeOfEducation} />
              <InfoItem icon={BookOpen} label={t('members.previousTypeOfEducation')} value={member.previousTypeOfEducation} />
              <InfoItem icon={BookOpen} label={t('members.previousInstitution')} value={member.previousInstitution} />
              <InfoItem icon={Calendar} label={t('members.registrationDate')} value={member.registrationDate} />
              <InfoItem icon={Calendar} label={t('members.educationStartDate')} value={member.educationStartDate} />
              <InfoItem icon={Calendar} label={t('members.educationEndDate')} value={member.educationEndDate} />
              <InfoItem icon={Calendar} label={t('members.durationOfStudy')} value={member.durationOfStudy} />
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                <Briefcase size={16} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('members.employmentInfo')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem 
                icon={BookOpen} 
                label={t('members.institutionName')} 
                value={member.institutionName} 
              />
              <InfoItem 
                icon={Calendar} 
                label={t('members.employmentPeriod')} 
                value={member.employmentPeriod} 
              />
              <InfoItem 
                icon={User} 
                label={t('members.roundPhase')} 
                value={member.roundPhase} 
              />
              <InfoItem 
                icon={User} 
                label={t('members.identificationNumber')} 
                value={member.identificationNumber} 
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <RegistrationSlip
          ref={slipRef}
          person={member}
          courses={[
            { code: 'Math1011', title: 'Basic Mathematics for Natural Science' },
            { code: 'EnLa1011', title: 'Communicative English Skill-I' },
            { code: 'Mgmt1211', title: 'Introduction to Management' },
            { code: 'Psch1011', title: 'General Psychology and Life Skills' },
            { code: 'LOCT1011', title: 'Logic and Critical Thinking' },
          ]}
          academicYear={'2025'}
          semester={'1'}
          department={member.department}
          batchNo={'4th Round'}
          typeOfProgram={member.typeOfEducation}
        />
        <GradeReport
          ref={gradeRef}
          person={member}
          grades={mockGrades}
          academicYear={'2025'}
          semester={'1st Year 1st Semester'}
          department={member.department}
          batchNo={'4th Round'}
          program={member.typeOfEducation || 'BA Degree in Information Technology & Cyber Security'}
          average={mockAverage}
          totalEcts={mockTotalEcts}
          totalValue={mockTotalValue}
          dateIssued={mockDateIssued}
        />
      </div>
    </div>
  );
};

export default MemberDetails; 