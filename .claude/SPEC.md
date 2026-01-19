# Find Embassy Korea - 기술 스펙 문서

## 1. 프로젝트 개요

### 1.1 프로젝트 설명
대한민국에 소재한 대사관 및 외교 공관 정보를 빠르고 직관적으로 검색할 수 있는 단일 페이지 웹 애플리케이션(SPA)

### 1.2 프로젝트 이름
Find Embassy Korea

### 1.3 핵심 가치
- 빠른 검색 경험
- Apple HIG 스타일의 미니멀한 UI
- SEO/GEO 최적화
- PWA 지원으로 네이티브 앱 같은 경험

---

## 2. 기술 스택

### 2.1 프레임워크 및 라이브러리
| 구분 | 선택 | 이유 |
|------|------|------|
| Framework | **Next.js 14+ (App Router)** | SEO/GEO 최적화, Static Export 지원 |
| Language | **TypeScript** | 타입 안전성, 더 나은 개발 경험 |
| Styling | **Tailwind CSS** | 빠른 개발, Apple 스타일 구현 용이 |
| Icons | **lucide-react** | 경량, 일관된 디자인 |
| Testing | **Jest + React Testing Library** | 기본 단위 테스트 |

### 2.2 배포 환경
| 구분 | 선택 |
|------|------|
| Hosting | **Vercel** (무료 플랜) |
| Build | **Static Export** |
| Domain | 커스텀 도메인 연결 |

---

## 3. 데이터 구조

### 3.1 Embassy 타입 정의
```typescript
interface Embassy {
  nameKR: string;      // 한국어 공관명
  nameEN: string;      // 영어 공관명
  addressKR: string;   // 한국어 주소
  addressEN: string;   // 영어 주소
  zipCode: string;     // 우편번호
  phone: string;       // 전화번호 (다수일 수 있음)
  fax: string;         // 팩스번호
  email: string;       // 이메일 (다수일 수 있음)
}
```

### 3.2 데이터 관리 전략

#### 저장 형식
| 항목 | 결정 |
|------|------|
| 형식 | **TypeScript 파일** (`embassyData.ts`) |
| 위치 | `src/data/embassyData.ts` |
| 이유 | 타입 검증 가능, IDE 자동완성 지원 |

#### 원본 파일 처리
| 파일 | 처리 |
|------|------|
| `data/embassy.md` | `data/backup/embassy.md`로 이동 (백업용 보관) |

#### 데이터 수정 워크플로우
1. `src/data/embassyData.ts` 파일 직접 수정
2. TypeScript 컴파일러가 타입 오류 검증
3. 커밋 후 Vercel 자동 재배포

#### 데이터 파일 구조
```typescript
// src/data/embassyData.ts
import { Embassy } from '@/lib/types';

export const embassyData: Embassy[] = [
  {
    nameKR: "미국",
    nameEN: "United States",
    addressKR: "서울특별시 종로구 세종대로 188",
    addressEN: "188 Sejong-daero, Jongno-gu, Seoul",
    zipCode: "03141",
    phone: "397-4114",
    fax: "738-8845",
    email: "embassyseoulpa@state.gov"
  },
  // ... 149개 기관
];
```

#### 데이터 정제
- 초기 변환 시 잘못된 데이터(예: `nan`, 오타 TLD) 수동 수정
- 이후 수정은 TypeScript 파일 직접 편집

### 3.3 빈 데이터 처리
- `null`, `undefined`, `"nan"`, 빈 문자열 → UI에서 **`-`** 표시

---

## 4. UI/UX 설계

### 4.1 디자인 컨셉
- **Apple Human Interface Guidelines** 준수
- Clean, Minimalist, White/Light Gray 톤
- San Francisco/Apple SD Gothic Neo 유사 Sans-serif 폰트
- 다크 모드 지원 (토글)

### 4.2 레이아웃
```
┌─────────────────────────────────────┐
│  Header                             │
│  ├─ 타이틀 (좌측)                    │
│  └─ 다크모드 토글 | 언어 토글 (우측)   │
├─────────────────────────────────────┤
│  Search Bar (sticky)                │
│  └─ X 버튼 (지우기)                  │
├─────────────────────────────────────┤
│  Results Area                       │
│  ├─ 안내 문구 (검색어 없을 때)        │
│  ├─ 검색 결과 카드 (리스트)           │
│  └─ '결과 없음' 메시지 (0건일 때)     │
├─────────────────────────────────────┤
│  Footer                             │
│  ├─ 네이버 지도 안내 텍스트           │
│  └─ App Store / Play Store 버튼     │
└─────────────────────────────────────┘
```

### 4.3 반응형 디자인
| 화면 크기 | 레이아웃 |
|----------|---------|
| Mobile | 전체 너비, 패딩 적용 |
| Desktop | **max-w-md (448px)** 중앙 정렬 |

### 4.4 카드 컴포넌트 상세
```
┌────────────────────────────────────────┐
│  공관명 (현재 언어)            [📍]    │
├────────────────────────────────────────┤
│  📍 주소 (현재 언어)                    │
│  📮 우편번호                           │
│  📞 전화번호 1  (tel: 링크)            │
│  📞 전화번호 2  (tel: 링크)            │
│  📠 팩스번호                           │
│  ✉️ 이메일 1    (mailto: 링크)         │
│  ✉️ 이메일 2    (mailto: 링크)         │
└────────────────────────────────────────┘
```

**카드 스타일링:**
- `rounded-2xl` 모서리
- 부드러운 그림자
- backdrop blur 효과 (다크모드)

### 4.5 정보 표시 우선순위
1. 전화번호
2. 이메일
3. 주소/우편번호
4. 팩스번호

### 4.6 여러 연락처 처리
- 전화번호/이메일이 여러 개인 경우: **분리 표시, 각각 클릭 가능**
- `02-123-4567/8910` → `02-123-4567`, `02-123-8910` 분리
- 각 번호/이메일에 개별 링크 적용

---

## 5. 기능 명세

### 5.1 언어 토글
| 항목 | 명세 |
|------|------|
| 위치 | 헤더 우측 |
| UI | iOS 스타일 세그먼티드 컨트롤 |
| 기본값 | 브라우저 언어 감지 (`navigator.language`) |
| 저장 | 저장하지 않음 (매번 브라우저 언어 감지) |
| 전환 시 | 검색어 초기화 |

### 5.2 검색 기능
| 항목 | 명세 |
|------|------|
| 방식 | 실시간 필터링 (Real-time FTS) |
| Debounce | 없음 (즉시 필터링) |
| 검색 대상 | 공관명만 (nameKR 또는 nameEN) |
| 검색 기준 | 현재 선택된 언어 |
| 대소문자 | 무시 (case-insensitive) |
| X 버튼 | 검색어 한 번에 지우기 |

### 5.3 초기 화면
- 검색어 없을 때: **안내 문구만 표시**
  - KR: "대사관 또는 국제기구를 검색하세요"
  - EN: "Search for an embassy or international organization"

### 5.4 검색 결과
- 결과 있음: 카드 리스트 표시
- 결과 없음: **심플 메시지**
  - KR: "검색 결과가 없습니다"
  - EN: "No results found"
- 결과 개수: 표시하지 않음

### 5.5 지도 연동
| 항목 | 명세 |
|------|------|
| 버튼 위치 | 카드 우측 상단 |
| 아이콘 | MapPin (lucide-react) |
| 동작 | 새 탭에서 네이버 지도 열기 |
| URL 형식 | `https://map.naver.com/v5/search/{encoded_addressKR}` |
| 중요 | **항상 한국어 주소(addressKR) 사용** (UI 언어와 무관) |

### 5.6 다크 모드
| 항목 | 명세 |
|------|------|
| 위치 | 헤더 우측, 언어 토글 옆 |
| UI | 아이콘 버튼 (Sun/Moon) |
| 저장 | localStorage에 저장 |
| 기본값 | 시스템 설정 확인 후 저장값 없으면 라이트 모드 |

---

## 6. 애니메이션

### 6.1 검색 결과 애니메이션
- 방식: **미묘한 페이드 + 슬라이드**
- 속성: `opacity` + `translateY`
- 시간: 200ms
- 이징: ease-out

### 6.2 토글 애니메이션
- 부드러운 전환 효과 (transition)

---

## 7. SEO 최적화

### 7.1 메타 태그
```html
<title>Find Embassy Korea | 주한 대사관 찾기</title>
<meta name="description" content="대한민국 소재 대사관, 영사관, 국제기구 연락처를 빠르게 검색하세요" />
<meta name="keywords" content="embassy, korea, 대사관, 영사관, 외교공관" />
```

### 7.2 Open Graph
```html
<meta property="og:title" content="Find Embassy Korea" />
<meta property="og:description" content="주한 대사관 및 국제기구 검색" />
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-image.png" />
```

### 7.3 구조화된 데이터 (JSON-LD)
- 스키마: `GovernmentOffice` / `Embassy`
- 각 기관별 구조화 데이터 포함

---

## 8. PWA 설정

### 8.1 manifest.json
```json
{
  "name": "Find Embassy Korea",
  "short_name": "Embassy Korea",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [...]
}
```

### 8.2 Service Worker
- 오프라인 캐시 지원
- 정적 에셋 캐싱

---

## 9. 접근성 (a11y)

### 9.1 기본 접근성 구현
- Semantic HTML 사용
- `aria-label` 적용
- 키보드 네비게이션 지원
- 충분한 색상 대비

---

## 10. Footer

### 10.1 네이버 지도 안내
- KR: "본 서비스는 실제 위치 확인을 위해 네이버 지도를 사용합니다. 앱이 없다면 설치를 권장합니다."
- EN: "This service uses Naver Map for accurate locations. We recommend installing the app."

### 10.2 앱 설치 버튼
| 플랫폼 | 스타일 | 링크 |
|--------|--------|------|
| iOS | 아이콘 + 텍스트 버튼 | App Store 직접 링크 |
| Android | 아이콘 + 텍스트 버튼 | Play Store 직접 링크 |

### 10.3 정보 수정 요청 버튼
| 항목 | 내용 |
|------|------|
| 버튼 텍스트 | KR: "정보 수정 요청" / EN: "Report Incorrect Info" |
| 동작 | Google Form 새 탭에서 열기 |
| 위치 | 앱 설치 버튼 아래 |

---

## 11. 사용자 피드백

### 11.1 피드백 채널
| 항목 | 결정 |
|------|------|
| 방식 | **Google Form** |
| 이유 | GitHub 계정 없이 누구나 작성 가능, 스프레드시트 자동 연동 |

### 11.2 Google Form 양식 항목
| 필드 | 타입 | 필수 |
|------|------|------|
| 기관명 | 텍스트 (단답형) | O |
| 수정할 항목 | 체크박스 (전화/이메일/주소/팩스/기타) | O |
| 올바른 정보 | 텍스트 (장문형) | O |
| 연락처 (이메일) | 이메일 | X |
| 추가 설명 | 텍스트 (장문형) | X |

### 11.3 피드백 처리 워크플로우
1. 사용자가 Footer의 "정보 수정 요청" 버튼 클릭
2. Google Form에서 피드백 작성
3. Google Spreadsheet에 자동 기록
4. 관리자가 스프레드시트 확인 (이메일 알림 설정 가능)
5. 검토 후 `src/data/embassyData.ts` 수정
6. 커밋 → Vercel 자동 재배포

### 11.4 Google Form 설정 (배포 시 필요)
- [ ] Google Form 생성
- [ ] 응답 스프레드시트 연결
- [ ] 새 응답 이메일 알림 활성화
- [ ] Form URL을 환경변수 또는 상수로 관리

---

## 12. 에러 처리

| 상황 | 처리 방식 |
|------|----------|
| 빈 데이터 필드 | `-` 표시 |
| 지도 링크 실패 | 별도 처리 없음 (브라우저 기본 동작) |
| 잘못된 이메일/전화 | 원본 그대로 표시 (수동 수정된 데이터 사용) |

---

## 12. 파일 구조 (예상)

```
find-embassy-korea/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Header.tsx          # 헤더 (타이틀, 토글들)
│   │   ├── SearchBar.tsx       # 검색바
│   │   ├── EmbassyCard.tsx     # 대사관 카드
│   │   ├── EmbassyList.tsx     # 카드 리스트
│   │   ├── Footer.tsx          # 푸터
│   │   ├── LanguageToggle.tsx  # 언어 토글
│   │   └── ThemeToggle.tsx     # 다크모드 토글
│   ├── data/
│   │   └── embassyData.ts      # 대사관 데이터 (TypeScript)
│   └── lib/
│       ├── types.ts            # 타입 정의
│       └── utils.ts            # 유틸리티 함수
├── data/
│   └── backup/
│       └── embassy.md          # 원본 데이터 (백업용)
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/                  # 앱 아이콘
├── __tests__/                  # 테스트 파일
├── next.config.js              # Next.js 설정
├── tailwind.config.js          # Tailwind 설정
└── package.json
```

---

## 13. 개발 우선순위

1. **Phase 1: 기본 기능**
   - 프로젝트 세팅 (Next.js + TypeScript + Tailwind)
   - 데이터 변환 및 타입 정의
   - 기본 UI 컴포넌트 구현
   - 검색 기능 구현

2. **Phase 2: 스타일 및 UX**
   - Apple 스타일 디자인 적용
   - 애니메이션 구현
   - 반응형 디자인 완성
   - 다크 모드 구현

3. **Phase 3: 최적화**
   - SEO 메타 태그 및 JSON-LD
   - PWA 설정
   - 접근성 검토
   - 테스트 작성

4. **Phase 4: 배포**
   - Vercel 배포
   - 커스텀 도메인 연결
   - 최종 테스트

---

## 14. 데이터 정제 필요 항목

| 기관명 | 필드 | 현재 값 | 수정 필요 |
|--------|------|---------|----------|
| 주제주중국총영사관 | email | chinaconsul_jeju_kor@mfa.gov.추 | TLD 오타 수정 필요 |
| 중국 | email | nan | 데이터 없음 처리 |
| 유엔식량농업기구 | phone, fax | nan | 데이터 없음 처리 |

---

## 15. 버전 정보

- 문서 버전: 1.0
- 작성일: 2026-01-19
- 작성자: Claude Code Interview
