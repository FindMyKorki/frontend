import { apiCall } from '../utils/ApiHandler';

export const updateUserProfile = async (fullName: string, removeAvatar: boolean) => {
  try {
    return await apiCall({
      method: 'PUT',
      url: '/profiles',
      data: { full_name: fullName, remove_avatar: removeAvatar },
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
    console.error('PUT /tutors', e);
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
