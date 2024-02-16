// Offers.ts
export interface Profile {
  user_id: string;
  name?: string;
  surname?: string;
  avatar_url?: string;
  experience_years?: string;
  experience_info?: string;
  verificated?: boolean;
}

export interface Offer {
  offer_id?: string;
  created_at: any;
  subject_id: string;
  user_id: string;
  education_level: string;
  education_method: string;
  price: number;
  time: number;
  city: string;
  description: string;
  profile?: Profile | undefined;
}

export interface Availability {
  id: number;
  offer_id: string;
  day: string;
  eight: boolean;
  nine: boolean;
  ten: boolean;
  eleven: boolean;
  twelve: boolean;
  thirteen: boolean;
  fourteen: boolean;
  fifteen: boolean;
  sixteen: boolean;
  seventeen: boolean;
  eighteen: boolean;
  nineteen: boolean;
  twenty: boolean;
  twentyOne: boolean;
  twentyTwo: boolean;
}

export interface Requests {
  request_id?: string;
  offer_id: string;
  participant_id: string;
  stage: string;
  month: string;
  week_day: string;
  hour: string;
  created_at: any;
}
