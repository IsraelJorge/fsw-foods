export enum Permission {
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
}

export const hasPermission = (
  userStatus: 'unauthenticated' | 'authenticated' | 'loading',
  permission: Permission | Permission[],
) => {
  if (Array.isArray(permission)) {
    return permission.some((p) => p.includes(userStatus))
  }

  return permission.includes(userStatus)
}
