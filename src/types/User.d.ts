export interface UserProfile {
  username: string;
  email: string;
  fullname: string;
  image: string;
  institution: string;
  location: string;
  password: string;
  timezone: string;
}

export interface User {
  id: string;
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
}
