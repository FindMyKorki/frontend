import { apiCall } from '../utils/ApiHandler';

export const updateUserProfile = async (
  isTutor?: boolean,
  fullName?: string,
  avatarUrl?: string,
) => {
  try {
    const data = fullName ? { full_name: fullName, avatar_url: avatarUrl } : { is_tutor: isTutor };

    return await apiCall({
      method: 'PUT',
      url: '/users/profile',
      data: data,
    });
  } catch (e) {
    console.error('PUT /users/profile', e);
    return null;
  }
};
