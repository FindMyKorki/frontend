export type TutorReview = {
  id: number;
  rating: number | null;
  comment: string;
  created_at: string;
  student_id: string;
  student_full_name: string;
  student_avatar_url: string | null;
};

export type TutorReviewList = TutorReview[];
