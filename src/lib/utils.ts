import { Embassy, Language } from './types';

/**
 * 빈 데이터 체크 (null, undefined, 'nan', 빈 문자열)
 */
export function isEmpty(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim().toLowerCase();
  return trimmed === '' || trimmed === 'nan' || trimmed === '-';
}

/**
 * 빈 데이터를 '-'로 표시
 */
export function displayValue(value: string | null | undefined): string {
  return isEmpty(value) ? '-' : value!.trim();
}

/**
 * 전화번호 문자열을 개별 번호 배열로 파싱
 * 예: "02-123-4567/8910" → ["02-123-4567", "02-123-8910"]
 * 예: "02-123-4567, 02-234-5678" → ["02-123-4567", "02-234-5678"]
 */
export function parsePhoneNumbers(phoneStr: string): string[] {
  if (isEmpty(phoneStr)) return [];

  const phones: string[] = [];

  // 콤마나 세미콜론으로 구분된 경우
  const parts = phoneStr.split(/[,;]/).map(p => p.trim()).filter(p => p);

  for (const part of parts) {
    // 슬래시로 축약된 번호 처리 (예: 793-9575/6 → 793-9575, 793-9576)
    if (part.includes('/')) {
      const expanded = expandPhoneNumber(part);
      phones.push(...expanded);
    } else if (part.includes('~')) {
      // 물결표로 범위 표시된 경우 (예: 794-6482~3)
      const expanded = expandPhoneRange(part);
      phones.push(...expanded);
    } else {
      phones.push(part.trim());
    }
  }

  return phones.filter(p => p.length > 0);
}

/**
 * 슬래시로 축약된 전화번호 확장
 * 예: "793-9575/6" → ["793-9575", "793-9576"]
 * 예: "790-3814/5/6" → ["790-3814", "790-3815", "790-3816"]
 */
function expandPhoneNumber(phone: string): string[] {
  const parts = phone.split('/');
  if (parts.length === 1) return [phone];

  const baseNumber = parts[0].trim();
  const results = [baseNumber];

  for (let i = 1; i < parts.length; i++) {
    const suffix = parts[i].trim();
    if (suffix.length === 0) continue;

    // suffix가 숫자만 있으면 마지막 자릿수 교체
    if (/^\d+$/.test(suffix)) {
      const suffixLen = suffix.length;
      const newNumber = baseNumber.slice(0, -suffixLen) + suffix;
      results.push(newNumber);
    } else {
      // 그 외의 경우 그대로 추가
      results.push(suffix);
    }
  }

  return results;
}

/**
 * 물결표로 범위 표시된 전화번호 확장
 * 예: "794-6482~3" → ["794-6482", "794-6483"]
 */
function expandPhoneRange(phone: string): string[] {
  const match = phone.match(/^(.+?)(\d+)~(\d+)$/);
  if (!match) return [phone];

  const [, prefix, startStr, endStr] = match;
  const start = parseInt(startStr, 10);
  const endDigit = parseInt(endStr, 10);

  // endStr이 한 자리면 start의 마지막 자릿수만 교체
  const results: string[] = [];
  if (endStr.length === 1) {
    const startLastDigit = start % 10;
    for (let i = startLastDigit; i <= endDigit; i++) {
      results.push(prefix + Math.floor(start / 10) * 10 + i);
    }
  } else {
    for (let i = start; i <= parseInt(endStr, 10); i++) {
      results.push(prefix + i);
    }
  }

  return results.map(String);
}

/**
 * 이메일 문자열을 개별 이메일 배열로 파싱
 * 예: "a@b.com / c@d.com" → ["a@b.com", "c@d.com"]
 */
export function parseEmails(emailStr: string): string[] {
  if (isEmpty(emailStr)) return [];

  return emailStr
    .split(/[\/;,]/)
    .map(e => e.trim())
    .filter(e => e && e.includes('@'));
}

/**
 * 네이버 지도 URL 생성 (항상 한국어 주소 사용)
 */
export function getNaverMapUrl(addressKR: string): string {
  if (isEmpty(addressKR)) return '#';
  return `https://map.naver.com/v5/search/${encodeURIComponent(addressKR)}`;
}

/**
 * 전화번호 tel: URL 생성
 */
export function getTelUrl(phone: string): string {
  // 괄호, 공백, 하이픈 등 제거하고 숫자와 +만 남김
  const cleaned = phone.replace(/[^\d+]/g, '');
  // 한국 국번이 없으면 02 추가 (서울 기본)
  if (cleaned.length <= 8 && !cleaned.startsWith('0')) {
    return `tel:+82-2-${cleaned}`;
  }
  // 0으로 시작하면 한국 번호로 변환
  if (cleaned.startsWith('0')) {
    return `tel:+82-${cleaned.slice(1)}`;
  }
  return `tel:${cleaned}`;
}

/**
 * 이메일 mailto: URL 생성
 */
export function getMailtoUrl(email: string): string {
  return `mailto:${email.trim()}`;
}

/**
 * 검색 필터링
 */
export function filterEmbassies(
  embassies: Embassy[],
  query: string,
  language: Language
): Embassy[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase().trim();

  return embassies.filter(embassy => {
    const name = language === 'ko' ? embassy.nameKR : embassy.nameEN;
    return name.toLowerCase().includes(lowerQuery);
  });
}

/**
 * 브라우저 언어 감지
 */
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'ko';

  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang?.startsWith('ko')) return 'ko';
  return 'en';
}
