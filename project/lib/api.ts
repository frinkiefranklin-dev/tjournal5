// Minimal placeholder for API
export const authApi = {
  login: async (data: any) => ({ data: { access_token: 'fake_token' } }),
  signup: async (data: any) => ({ data: { access_token: 'fake_token' } })
};
export type UserLogin = { username: string; password: string };
export type UserCreate = { username: string; password: string; email?: string };
