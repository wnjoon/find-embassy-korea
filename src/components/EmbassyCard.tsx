'use client';

import { MapPin, Phone, Mail, Printer } from 'lucide-react';
import { Embassy, Language } from '@/lib/types';
import {
  displayValue,
  parsePhoneNumbers,
  parseEmails,
  getNaverMapUrl,
  getTelUrl,
  getMailtoUrl,
  isEmpty,
} from '@/lib/utils';

interface EmbassyCardProps {
  embassy: Embassy;
  language: Language;
}

export default function EmbassyCard({ embassy, language }: EmbassyCardProps) {
  const name = language === 'ko' ? embassy.nameKR : embassy.nameEN;
  const address = language === 'ko' ? embassy.addressKR : embassy.addressEN;
  const phones = parsePhoneNumbers(embassy.phone);
  const emails = parseEmails(embassy.email);
  const faxNumbers = parsePhoneNumbers(embassy.fax);

  return (
    <article className="bg-white dark:bg-apple-gray-900 rounded-2xl shadow-sm border border-apple-gray-200 dark:border-apple-gray-800 p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h2 className="text-base font-semibold text-apple-gray-600 dark:text-white leading-tight">
          {name}
        </h2>
        {!isEmpty(embassy.addressKR) && (
          <a
            href={getNaverMapUrl(embassy.addressKR)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800
                       hover:bg-apple-blue hover:text-white transition-colors duration-200"
            aria-label={language === 'ko' ? '지도에서 보기' : 'View on map'}
          >
            <MapPin className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="space-y-2 text-sm">
        {/* 주소 */}
        {!isEmpty(address) && (
          <div className="flex items-start gap-2 text-apple-gray-500 dark:text-apple-gray-400">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              {displayValue(address)}
              {!isEmpty(embassy.zipCode) && ` (${embassy.zipCode})`}
            </span>
          </div>
        )}

        {/* 전화번호 */}
        {phones.length > 0 && (
          <div className="flex items-start gap-2 text-apple-gray-500 dark:text-apple-gray-400">
            <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {phones.map((phone, i) => (
                <a
                  key={i}
                  href={getTelUrl(phone)}
                  className="text-apple-blue hover:underline"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 팩스 */}
        {faxNumbers.length > 0 && (
          <div className="flex items-start gap-2 text-apple-gray-500 dark:text-apple-gray-400">
            <Printer className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {faxNumbers.map((fax, i) => (
                <span key={i}>{fax}</span>
              ))}
            </div>
          </div>
        )}

        {/* 이메일 */}
        {emails.length > 0 && (
          <div className="flex items-start gap-2 text-apple-gray-500 dark:text-apple-gray-400">
            <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              {emails.map((email, i) => (
                <a
                  key={i}
                  href={getMailtoUrl(email)}
                  className="text-apple-blue hover:underline break-all"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
