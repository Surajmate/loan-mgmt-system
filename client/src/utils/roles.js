export const isAdmin = (
  user
) =>
  user?.role === 'ADMIN'

export const isManager = (
  user
) =>
  user?.role === 'MANAGER'

export const isCollectionAgent =
  (user) =>
    user?.role ===
    'COLLECTION_AGENT'

export const isFieldOfficer =
  (user) =>
    user?.role ===
    'FIELD_OFFICER'

export const isAccountant = (
  user
) =>
  user?.role ===
  'ACCOUNTANT'