export interface UserProfile {
  username: string;
  email_address: string;
  first_name: string;
  institution: string;
  last_name: string;
  location: string;
  password: string;
  profile_image: string;
  timezone: string;
}

export interface User {
  id: string;
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
}
