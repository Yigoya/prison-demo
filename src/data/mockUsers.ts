import { User } from '../contexts/AuthContext';

type MockUser = User & {
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@fpc.gov.et',
    role: 'admin',
    password: 'password',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@fpc.gov.et',
    role: 'teacher',
    password: 'password',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Staff User',
    email: 'staff@fpc.gov.et',
    role: 'staff',
    password: 'password',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];