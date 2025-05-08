export type Profile = {
  full_name: string;
  avatar_url: string;
  is_tutor: boolean;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  student_id: string;
};

export type TutorProfile = {
  bio: string;
  bio_long: string | null;
  rating: number;
  contact_email: string;
  phone_number: string;
  featured_review?: Review;
};

export type User = {
  id: string;
  provider_email: string;
  provider_display_name: string;
  profile?: Profile;
  tutor_profile?: TutorProfile;
};
