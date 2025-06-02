import { apiCall } from '../utils/ApiHandler';
import { ActiveOfferResponse, TutorOfferResponse, UpdateOfferRequest } from '../types/Offer';

const OFFERS_ENDPOINT = '/offers';
const TUTOR_OFFERS_ENDPOINT = '/tutor-offers';
const ACTIVE_OFFERS_ENDPOINT = '/active-offers';

export const OffersService = {
  async getOffer(offerId: number): Promise<ActiveOfferResponse> {
    try {
      return await apiCall<ActiveOfferResponse>({
        method: 'GET',
        url: `${OFFERS_ENDPOINT}/${offerId}`,
      });
    } catch (error) {
      console.error(`Error getting offer ${offerId}:`, error);
      throw error;
    }
  },

  async updateOffer(offerId: number, request: UpdateOfferRequest, userId: string): Promise<string> {
    try {
      return await apiCall<string>({
        method: 'PUT',
        url: `${OFFERS_ENDPOINT}/${offerId}`,
        data: request,
      });
    } catch (error) {
      console.error(`Error updating offer ${offerId}:`, error);
      throw error;
    }
  },

  async disableOffer(offerId: number, userId: string): Promise<string> {
    try {
      return await apiCall<string>({
        method: 'POST',
        url: `${OFFERS_ENDPOINT}/${offerId}:disable`,
      });
    } catch (error) {
      console.error(`Error disabling offer ${offerId}:`, error);
      throw error;
    }
  },

  async enableOffer(offerId: number, userId: string): Promise<string> {
    try {
      return await apiCall<string>({
        method: 'POST',
        url: `${OFFERS_ENDPOINT}/${offerId}:enable`,
      });
    } catch (error) {
      console.error(`Error enabling offer ${offerId}:`, error);
      throw error;
    }
  },

  async getTutorOffers(userId: string): Promise<TutorOfferResponse[]> {
    try {
      return await apiCall<TutorOfferResponse[]>({
        method: 'GET',
        url: `${TUTOR_OFFERS_ENDPOINT}/by-tutor`,
      });
    } catch (error) {
      console.error(`Error getting tutor offers for user ${userId}:`, error);
      throw error;
    }
  },

  async getTutorOffer(offerId: number, userId: string): Promise<TutorOfferResponse> {
    try {
      return await apiCall<TutorOfferResponse>({
        method: 'GET',
        url: `${TUTOR_OFFERS_ENDPOINT}/by-id/${offerId}`,
      });
    } catch (error) {
      console.error(`Error getting tutor offer ${offerId}:`, error);
      throw error;
    }
  },

  async getTutorActiveOffers(tutorId: string): Promise<TutorOfferResponse[]> {
    try {
      return await apiCall<TutorOfferResponse[]>({
        method: 'GET',
        url: `${ACTIVE_OFFERS_ENDPOINT}/${tutorId}`,
      });
    } catch (error) {
      console.error(`Error getting active offers for tutor ${tutorId}:`, error);
      throw error;
    }
  },

  async getActiveOffers(
    levelId: number,
    subjectId: number,
    startDate?: string,
    endDate?: string,
    minPrice?: number,
    maxPrice?: number,
    order: 'ASC' | 'DESC' = 'ASC',
    limit: number = 5,
    offset: number = 0,
  ): Promise<ActiveOfferResponse[]> {
    try {
      const params = new URLSearchParams();
      params.append('level_id', levelId.toString());
      params.append('subject_id', subjectId.toString());

      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      if (minPrice) params.append('min_price', minPrice.toString());
      if (maxPrice) params.append('max_price', maxPrice.toString());
      params.append('order', order);
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      return await apiCall<ActiveOfferResponse[]>({
        method: 'GET',
        url: `${ACTIVE_OFFERS_ENDPOINT}?${params.toString()}`,
      });
    } catch (error) {
      console.error('Error getting active offers:', error);
      throw error;
    }
  },
};

export default OffersService;
