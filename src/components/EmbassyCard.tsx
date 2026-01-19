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
    <article
      className="bg-white dark:bg-neutral-800/50 rounded-2xl p-4
                 shadow-sm dark:shadow-none
                 border border-apple-gray-200 dark:border-neutral-700/50
                 transition-all duration-200
                 hover:shadow-lg dark:hover:bg-neutral-800
                 hover:border-apple-gray-300 dark:hover:border-neutral-600
                 active:scale-[0.98]"
      role="article"
      aria-label={name}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-base font-semibold text-apple-gray-600 dark:text-neutral-100 leading-tight">
          {name}
        </h2>
        {!isEmpty(embassy.addressKR) && (
          <a
            href={getNaverMapUrl(embassy.addressKR)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2.5 rounded-full
                       bg-apple-gray-100 dark:bg-neutral-700
                       text-apple-gray-500 dark:text-neutral-400
                       hover:bg-apple-blue hover:text-white
                       active:scale-95 transition-all duration-200"
            aria-label={language === 'ko' ? '네이버 지도에서 보기' : 'View on Naver Map'}
          >
            <MapPin className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="space-y-2.5 text-sm">
        {!isEmpty(address) && (
          <div className="flex items-start gap-2.5 text-apple-gray-500 dark:text-neutral-400">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <address className="not-italic leading-relaxed">
              {displayValue(address)}
              {!isEmpty(embassy.zipCode) && (
                <span className="text-apple-gray-400 dark:text-neutral-500"> ({embassy.zipCode})</span>
              )}
            </address>
          </div>
        )}

        {phones.length > 0 && (
          <div className="flex items-start gap-2.5 text-apple-gray-500 dark:text-neutral-400">
            <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {phones.map((phone, i) => (
                <a
                  key={i}
                  href={getTelUrl(phone)}
                  className="text-apple-blue dark:text-blue-400 hover:underline active:opacity-70 transition-opacity"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        )}

        {faxNumbers.length > 0 && (
          <div className="flex items-start gap-2.5 text-apple-gray-500 dark:text-neutral-400">
            <Printer className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {faxNumbers.map((fax, i) => (
                <span key={i}>{fax}</span>
              ))}
            </div>
          </div>
        )}

        {emails.length > 0 && (
          <div className="flex items-start gap-2.5 text-apple-gray-500 dark:text-neutral-400">
            <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              {emails.map((email, i) => (
                <a
                  key={i}
                  href={getMailtoUrl(email)}
                  className="text-apple-blue dark:text-blue-400 hover:underline active:opacity-70 transition-opacity break-all"
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
