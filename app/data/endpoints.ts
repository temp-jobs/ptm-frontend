const API_VERSION = "v1"

export const endpoints = {
  auth: {
    login: `/${API_VERSION}/auth/login`,
    signup: `/${API_VERSION}/auth/signup`,
  },
  user: {
    profile: `/${API_VERSION}/user/profile`,
    updateProfile: `/${API_VERSION}/user/update-profile`,
  },
}
