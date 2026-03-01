export const ROLES = {
    ADMIN: 'ADMIN',
    INTERN: 'INTERN',
    USER: 'USER',
} as const;

export type Role = keyof typeof ROLES;

export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: ['create:lead', 'read:lead', 'update:lead', 'delete:lead', 'manage:users', 'manage:billing'],
    [ROLES.INTERN]: ['create:lead', 'read:lead', 'update:lead'],
    [ROLES.USER]: ['read:lead'],
};
