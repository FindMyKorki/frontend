import { apiCall } from '../utils/ApiHandler';
import { Review } from '../types/Tutor';
import { TutorOffer } from '../types/Tutor';
import { TutorProfile } from '../types/Tutor';
import { User } from '../types/User';

export const updateUserProfile = async (
  fullName: string,
  removeAvatar: boolean,
  avatar: string | null,
) => {
  try {
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('remove_avatar', `${removeAvatar}`);

    if (avatar) {
      const filename = avatar.split('/').pop() || 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

      formData.append('avatar', {
        uri: avatar,
        name: filename,
        type,
      } as any);
    }

    return await apiCall({
      method: 'PUT',
      url: '/profiles',
      data: formData,
    });
  } catch (e) {
    console.error('PUT /profiles', e);
    return null;
  }
};

export const updateTutorInfo = async (
  bio: string,
  bioLong: string,
  contactEmail: string,
  phoneNumber: string,
) => {
  try {
    return await apiCall({
      method: 'PUT',
      url: '/tutors',
      data: { bio: bio, bio_long: bioLong, contact_email: contactEmail, phone_number: phoneNumber },
    });
  } catch (e) {
    console.error('POST /tutors', e);
    return null;
  }
};

export const createProfile = async (isTutor: boolean) => {
  try {
    return await apiCall({
      method: 'POST',
      url: '/profiles',
      data: { is_tutor: isTutor },
    });
  } catch (e) {
    console.error('POST /profiles', e);
    return null;
  }
};

export const getUser = async (): Promise<User | null> => {
  const url = '/user';
  try {
    return await apiCall({
      method: 'GET',
      url: url,
    });
  } catch (e) {
    console.error('GET', url, e);
    return null;
  }
};

export const createTutorProfile = async (
  bio: string,
  bioLong: string,
  contactEmail: string,
  phoneNumber: string,
): Promise<string | null> => {
  const url = '/tutors';
  try {
    return await apiCall({
      method: 'POST',
      url: url,
      data: {
        bio: bio,
        bio_long: bioLong,
        contact_email: contactEmail,
        phone_number: phoneNumber,
      },
    });
  } catch (e) {
    console.error('POST', url, e);
    return null;
  }
};

export const getTutorProfile = async (tutorId: string): Promise<TutorProfile | null> => {
  const url = `/tutors/${tutorId}`;
  try {
    return await apiCall({
      method: 'GET',
      url: url,
    });
  } catch (e) {
    console.error('GET', url, e);
    return null;
  }
};

export const getTutorReviews = async (
  tutorId: string,
  sortBy: 'rating' | 'date',
  orderBy: 'increasing' | 'decreasing',
): Promise<Review[] | null> => {
  const query = new URLSearchParams({ sort_by: sortBy, order: orderBy }).toString();
  const url = `/tutor-reviews/${tutorId}?${query}`;
  try {
    return await apiCall({
      method: 'GET',
      url: url,
    });
  } catch (e) {
    console.error('GET', url, e);
    return null;
  }
};

export const getActiveTutorOffers = async (tutorId: string): Promise<TutorOffer[] | null> => {
  const url = `/active-offers/${tutorId}`;
  try {
    return await apiCall({
      method: 'GET',
      url: url,
    });
  } catch (e) {
    console.error('GET', url, e);
    return null;
  }
};

// Returns all offers owned by currently authenticated user
export const getAllTutorOffers = async (): Promise<TutorOffer[] | null> => {
  const url = '/tutor-offers/by-tutor';
  try {
    return await apiCall({
      method: 'GET',
      url: url,
    });
  } catch (e) {
    console.error('GET', url, e);
    return null;
  }
};
