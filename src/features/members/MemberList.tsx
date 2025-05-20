import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { mockMembers, Member } from '../../data/mockMembers';
import { Plus, FileDown, Eye, Edit } from 'lucide-react';

const MemberList: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRowClick = (member: Member) => {
    navigate(`/members/${member.id}`);
  };

  const columns = [
    {
      header: t('members.id'),
      accessor: (member: Member) => member.id,
      sortable: true,
    },
    {
      header: t('members.name'),
      accessor: (member: Member) => (
        <div>
          <div className="font-medium text-gray-900">{member.studentName}</div>
          <div className="text-sm text-gray-500">{member.department}</div>
        </div>
      ),
      sortable: true,
    },
    {
      header: t('members.department'),
      accessor: (member: Member) => member.department,
      sortable: true,
    },
    {
      header: t('members.typeOfEducation'),
      accessor: (member: Member) => member.typeOfEducation,
      sortable: true,
    },
    {
      header: t('members.roundPhase'),
      accessor: (member: Member) => member.roundPhase,
      sortable: true,
    },
    {
      header: t('members.employmentPeriod'),
      accessor: (member: Member) => member.employmentPeriod,
      sortable: true,
    },
    {
      header: t('members.registrationDate'),
      accessor: (member: Member) => member.registrationDate,
      sortable: true,
    },
    {
      header: t('common.actions'),
      accessor: (member: Member) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/members/${member.id}`);
            }}
            className="p-1 text-gray-600 hover:text-primary"
            title={t('common.view')}
          >
            <Eye size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/members/edit/${member.id}`);
            }}
            className="p-1 text-gray-600 hover:text-primary"
            title={t('common.edit')}
          >
            <Edit size={16} />
          </button>
        </div>
      ),
    },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch = Object.values(member).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterType === 'all' || member.typeOfEducation === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <PageHeader
        title={t('members.title')}
        subtitle={t('members.subtitle')}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/members/register')}
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-2" />
            {t('members.register')}
          </button>
          <button className="btn btn-outline flex items-center">
            <FileDown size={16} className="mr-2" />
            {t('common.export')}
          </button>
        </div>
      </PageHeader>

      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">{t('members.allTypes')}</option>
                <option value="PhD">{t('members.phd')}</option>
                <option value="Masters">{t('members.masters')}</option>
                <option value="Bachelors">{t('members.bachelors')}</option>
              </select>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredMembers}
          keyExtractor={(member: Member) => member.id}
          onRowClick={handleRowClick}
          loading={isLoading}
          emptyMessage={t('members.noMembersFound')}
        />
      </div>
    </div>
  );
};

export default MemberList; 