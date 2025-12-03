import { apiClient } from './client';

export interface CreateRequestPayload {
  marka: string;
  model: string;
  parcaAdi: string;
  aciklama: string;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
}

export interface RequestItem {
  _id: string;
  userId: string;
  marka: string;
  model: string;
  parcaAdi: string;
  aciklama: string;
  imageUrl?: string;
  createdAt: string;
}

export async function createRequest(payload: CreateRequestPayload) {
  const formData = new FormData();
  formData.append('marka', payload.marka);
  formData.append('model', payload.model);
  formData.append('parcaAdi', payload.parcaAdi);
  formData.append('aciklama', payload.aciklama);

  if (payload.image) {
    formData.append('image', {
      uri: payload.image.uri,
      type: payload.image.type,
      name: payload.image.name,
    } as any);
  }

  const { data } = await apiClient.post<RequestItem>('/requests/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function getUserRequests(userId: string) {
  const { data } = await apiClient.get<RequestItem[]>(`/requests/user/${userId}`);
  return data;
}

export async function getAllRequests() {
  const { data } = await apiClient.get<RequestItem[]>('/requests/all');
  return data;
}

