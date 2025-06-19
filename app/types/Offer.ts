export interface OfferResponse {
  id: number;
  tutor_id: string;
  price: number;
  description: string;
  tutor_avatar_url?: string;
  tutor_rating?: number;
  subject_name: string;
  icon_url?: string;
  level: string;
}

export interface TutorOfferResponse extends OfferResponse {
  is_active: boolean;
  subject_id: number;
  level_id: number;
  created_at: string;
  updated_at: string;
}

export interface ActiveOfferResponse {
  title: string;
  id: number;
  tutor_id: string;
  price: number;
  description: string;
  tutor_avatar_url?: string;
  tutor_rating?: number;
  subject_name: string;
  icon_url?: string;
  level: string;
  tutor_full_name: string;
  tutor_description: string;
}

export interface UpdateOfferRequest {
  subject_id: number;
  price: number;
  description: string;
  level_id: number;
}
