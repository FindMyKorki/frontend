export type TutorProfile = {
  bio: string | null;
  bio_long: string | null;
  contact_email: string | null;
  phone_number: string | null;
  rating: number;
  featured_review_id: number | null;
  featured_review_student_id: string | null;
  featured_review_student_fullname: string | null;
  featured_review_student_avatar_url: string | null;
  featured_review_rating: number | null;
  featured_review_comment: string | null;
  full_name: string | null;
  avatar_url: string | null;
  reviews_count: number;
};

export type Review = {
  id: number;
  rating: number | null;
  comment: string;
  created_at: string;
  student_id: string;
  student_full_name: string;
  student_avatar_url: string | null;
};

export type TutorOffer = {
  id: number;
  tutor_id: string;
  price: number | null;
  subject_name: string | null;
  description: string | null;
  title: string | null;
  icon_url: string | null;
  level: string | null;
  is_active: boolean;
};
