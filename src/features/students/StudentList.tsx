import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Download, Filter, Printer } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { mockStudents, Student } from '../../data/mockStudents';
import GradeReport from '../../components/common/GradeReport';
import * as htmlToImage from 'html-to-image';
import { useReactToPrint } from 'react-to-print';

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

const StudentList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filterInmate, setFilterInmate] = useState<boolean | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  
  const gradeRefs = useRef<(HTMLDivElement | null)[]>([]);
  // @ts-ignore

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
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

  const handleDownloadAllGradesPng = async () => {
    if (filteredStudents.length === 0) return;
    
    try {
      setIsDownloading(true);
      
      // Create a temporary container for capturing
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      for (let i = 0; i < filteredStudents.length; i++) {
        const ref = gradeRefs.current[i];
        if (!ref) continue;

        try {
          // Clone the element and append to container
          const clone = ref.cloneNode(true) as HTMLElement;
          
          // Remove any problematic images
          const images = clone.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            if (img.classList.contains('h-16') && img.classList.contains('mb-2')) {
              img.remove();
            }
          });

          clone.style.position = 'relative';
          clone.style.left = '0';
          clone.style.top = '0';
          clone.style.width = '800px';
          clone.style.backgroundColor = 'white';
          container.appendChild(clone);

          // Wait for all images to load
          await waitForImages(clone);

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
          link.download = `GradeReport-${filteredStudents[i].id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Remove the clone
          container.removeChild(clone);

          // Add a small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to download grade report for student ${filteredStudents[i].id}:`, error);
        }
      }

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('Failed to download grade reports:', error);
      alert('Failed to download some grade reports. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRowClick = (student: Student) => {
    navigate(`/students/${student.id}`);
  };
  
  // Get unique departments and batches
  const departments = Array.from(new Set(mockStudents.map(s => s.department))).filter(Boolean);
  const batches = Array.from(new Set(mockStudents.map(s => s.batchNumber))).filter(Boolean);

  let filteredStudents = mockStudents;
  if (filterInmate !== null) {
    filteredStudents = filteredStudents.filter(student => student.isInmate === filterInmate);
  }
  if (departmentFilter !== 'all') {
    filteredStudents = filteredStudents.filter(student => student.department === departmentFilter);
  }
  if (batchFilter !== 'all') {
    filteredStudents = filteredStudents.filter(student => student.batchNumber === batchFilter);
  }
  if (search.trim()) {
    filteredStudents = filteredStudents.filter(student =>
      student.studentName.toLowerCase().includes(search.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('students.list')}
        subtitle={t('students.title')}
      >
        <button
          onClick={() => navigate('/students/register')}
          className="btn btn-primary flex items-center"
        >
          <PlusCircle size={16} className="mr-2" />
          {t('students.register')}
        </button>

        <button
          onClick={handleDownloadAllGradesPng}
          className="btn btn-primary ml-2"
          disabled={isDownloading}
        >
          <Download size={16} className="mr-1" />
          {isDownloading ? 'Downloading...' : 'Download All Grade Reports (PNG)'}
        </button>
      </PageHeader>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <button
          onClick={() => setFilterInmate(null)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filterInmate === null 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {t('common.all')}
        </button>
        <button
          onClick={() => setFilterInmate(false)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filterInmate === false 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {t('students.regular')}
        </button>
        <button
          onClick={() => setFilterInmate(true)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filterInmate === true 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {t('students.inmates')}
        </button>
        {/* Department Filter */}
        <select
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
          className="ml-2 px-3 py-1.5 rounded-md border border-gray-300 text-sm"
        >
          <option value="all">{t('students.department')}: {t('common.all')}</option>
          {departments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        {/* Batch/Class Filter */}
        <select
          value={batchFilter}
          onChange={e => setBatchFilter(e.target.value)}
          className="ml-2 px-3 py-1.5 rounded-md border border-gray-300 text-sm"
        >
          <option value="all">{t('students.batchNumber')}: {t('common.all')}</option>
          {batches.map(batch => (
            <option key={batch} value={batch}>{batch}</option>
          ))}
        </select>
        
        <div className="ml-auto">
          <button className="btn btn-outline flex items-center">
            <Filter size={16} className="mr-2" />
            {t('common.filter')}
          </button>
        </div>
      </div>
      
      {/* Off-screen GradeReports for batch actions */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        {filteredStudents.map((student, idx) => (
          <GradeReport
            key={student.id}
            ref={el => (gradeRefs.current[idx] = el)}
            person={student}
            grades={mockGrades}
            academicYear={student.academicYear || '2025'}
            semester={'1st Year 1st Semester'}
            department={student.department}
            batchNo={student.batchNumber || '4th Round'}
            program={student.typeOfEducation || 'BA Degree in Information Technology & Cyber Security'}
            average={mockAverage}
            totalEcts={mockTotalEcts}
            totalValue={mockTotalValue}
            dateIssued={mockDateIssued}
          />
        ))}
      </div>
      
      <DataTable
        data={filteredStudents}
        loading={isLoading}
        keyExtractor={(student) => student.id}
        onRowClick={handleRowClick}
        columns={[
          {
            header: t('students.id'),
            accessor: 'id',
            sortable: true,
          },
          {
            header: t('students.name'),
            accessor: (student) => (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                  {student.photo ? (
                    <img src={student.photo} alt={student.studentName} className="h-8 w-8 rounded-full" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {student.studentName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {student.studentName} {student.fatherName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {student.email}
                  </div>
                </div>
              </div>
            ),
            sortable: false,
          },
          {
            header: t('students.department'),
            accessor: 'department',
            sortable: true,
          },
          {
            header: t('students.typeOfEducation'),
            accessor: 'typeOfEducation',
            sortable: true,
          },
          {
            header: t('students.batchNumber'),
            accessor: 'batchNumber',
            sortable: true,
          },
          {
            header: t('common.type'),
            accessor: (student) => (
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                student.isInmate 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {student.isInmate ? t('students.inmate') : t('students.regular')}
              </span>
            ),
            sortable: false,
          },
          {
            header: t('students.registrationDate'),
            accessor: 'registrationDate',
            sortable: true,
          },
          {
            header: t('common.actions'),
            accessor: () => (
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {t('common.view')}
                </button>
                <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                  {t('common.edit')}
                </button>
              </div>
            ),
            sortable: false,
          },
        ]}
        emptyMessage={t('students.noStudentsFound')}
      />
    </div>
  );
};

export default StudentList;