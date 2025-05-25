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

export type TutorOfferList = TutorOffer[];
