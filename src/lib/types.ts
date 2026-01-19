export interface Embassy {
  nameKR: string;
  nameEN: string;
  addressKR: string;
  addressEN: string;
  zipCode: string;
  phone: string;
  fax: string;
  email: string;
}

export type Language = 'ko' | 'en';

export interface LocalizedText {
  ko: string;
  en: string;
}
