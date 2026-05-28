import {
  FaHome,
  FaUsers,
  FaLayerGroup,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaRedoAlt,
  FaFolderOpen,
  FaUsersCog,
  FaTasks,
  FaBuilding
} from 'react-icons/fa'

const navigation = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: FaHome,

    roles: [
      'ADMIN',
      'MANAGER',
      'AUDITOR',
    ],
  },

  {
    name: 'Branches',

    path: '/branches',

    icon: FaBuilding,

    roles: [
      'ADMIN',
      'MANAGER',
      'AUDITOR',
    ]
  },

  {
    name: 'Customers',
    path: '/customers',
    icon: FaUsers,

    roles: [
      'ADMIN',
      'MANAGER',
      'DATA_ENTRY',
      'COLLECTION_AGENT',
    ],
  },

  {
    name: 'Groups',
    path: '/groups',
    icon: FaLayerGroup,

    roles: [
      'ADMIN',
      'MANAGER',
    ],
  },

  {
    name: 'Loans',
    path: '/loans',
    icon: FaMoneyBillWave,

    roles: [
      'ADMIN',
      'MANAGER',
    ],
  },

  {
    name: 'Repayments',
    path: '/repayments',
    icon: FaFileInvoiceDollar,

    roles: [
      'ADMIN',
      'MANAGER',
      'COLLECTION_AGENT',
    ],
  },

  {
    name: 'Foreclosure',
    path: '/foreclosure',
    icon: FaBalanceScale,

    roles: ['ADMIN'],
  },

  {
    name: 'Restructure',
    path: '/restructure',
    icon: FaRedoAlt,

    roles: [
      'ADMIN',
      'MANAGER',
    ],
  },

  {
    name: 'Documents',
    path: '/documents',
    icon: FaFolderOpen,

    roles: [
      'ADMIN',
      'MANAGER',
      'DATA_ENTRY',
    ],
  },

  {
    name: 'Employees',
    path: '/employees',
    icon: FaUsersCog,

    roles: ['ADMIN'],
  },

  {
    name: 'Assignments',
    path: '/assignments',
    icon: FaTasks,

    roles: [
      'ADMIN',
      'MANAGER',
    ],
  },
]

export default navigation