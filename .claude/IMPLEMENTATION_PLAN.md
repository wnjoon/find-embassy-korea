# Find Embassy Korea - 구현 계획

## 브랜치 전략

```
main (production)
└── dev (development)
    ├── phase1/project-setup
    ├── phase1/data-conversion
    ├── phase2/core-components
    ├── phase2/search-feature
    ├── phase3/styling-ux
    ├── phase4/dark-mode
    ├── phase5/seo-pwa
    └── phase6/final-polish
```

---

## 구현 단계별 상세 계획

### Phase 1: 프로젝트 초기 설정
**브랜치**: `phase1/project-setup`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| Next.js 14 프로젝트 생성 (App Router) | ★☆☆ | `npx create-next-app@latest` |
| TypeScript 설정 확인 | ★☆☆ | 기본 포함 |
| Tailwind CSS 설정 확인 | ★☆☆ | 기본 포함 |
| lucide-react 설치 | ★☆☆ | `npm install lucide-react` |
| 폴더 구조 생성 | ★☆☆ | src/components, src/data, src/lib |
| 타입 정의 파일 생성 | ★☆☆ | src/lib/types.ts |
| 기본 레이아웃 설정 | ★☆☆ | app/layout.tsx, globals.css |

**산출물**: 빌드 가능한 기본 Next.js 프로젝트

---

### Phase 2: 데이터 변환
**브랜치**: `phase1/data-conversion`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| embassy.md → embassyData.ts 변환 | ★★☆ | 149개 기관 파싱 |
| 데이터 정제 (nan, 오타 수정) | ★★☆ | 잘못된 이메일 TLD 등 |
| 원본 파일 백업 이동 | ★☆☆ | data/backup/embassy.md |
| 유틸리티 함수 작성 | ★★☆ | 전화번호/이메일 파싱 |

**산출물**: 정제된 TypeScript 데이터 파일

---

### Phase 3: 핵심 컴포넌트 구현
**브랜치**: `phase2/core-components`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| Header 컴포넌트 | ★★☆ | 타이틀, 토글 영역 |
| SearchBar 컴포넌트 | ★★☆ | 입력, X 버튼 |
| EmbassyCard 컴포넌트 | ★★★ | 모든 정보 표시, 링크 처리 |
| EmbassyList 컴포넌트 | ★★☆ | 카드 목록, 빈 상태 |
| Footer 컴포넌트 | ★★☆ | 안내문, 앱스토어 링크 |
| LanguageToggle 컴포넌트 | ★★☆ | 한/영 전환 |

**산출물**: 모든 UI 컴포넌트 (기능 미완성 상태)

---

### Phase 4: 검색 기능 구현
**브랜치**: `phase2/search-feature`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| 언어 상태 관리 (Context) | ★★☆ | LanguageContext |
| 브라우저 언어 감지 | ★★☆ | navigator.language |
| 실시간 검색 필터링 | ★★☆ | 대소문자 무시 |
| 초기 화면 안내 문구 | ★☆☆ | 검색어 없을 때 |
| 결과 없음 메시지 | ★☆☆ | 0건일 때 |
| 네이버 지도 연동 | ★★☆ | addressKR로 URL 생성 |

**산출물**: 완전히 작동하는 검색 기능

---

### Phase 5: 스타일링 및 UX
**브랜치**: `phase3/styling-ux`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| Apple HIG 스타일 적용 | ★★★ | 폰트, 색상, 그림자 |
| 카드 디자인 완성 | ★★☆ | rounded-2xl, 그림자 |
| 반응형 디자인 | ★★☆ | mobile-first, max-w-md |
| 검색바 sticky 적용 | ★★☆ | 헤더 아래 고정 |
| 검색 결과 애니메이션 | ★★☆ | 페이드+슬라이드 |
| 토글 애니메이션 | ★★☆ | 부드러운 전환 |

**산출물**: Apple 스타일 완성된 UI

---

### Phase 6: 다크 모드
**브랜치**: `phase4/dark-mode`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| ThemeToggle 컴포넌트 | ★★☆ | Sun/Moon 아이콘 |
| 다크 모드 색상 정의 | ★★☆ | Tailwind dark: 클래스 |
| localStorage 저장 | ★★☆ | 테마 상태 유지 |
| 시스템 설정 감지 | ★★☆ | prefers-color-scheme |
| 전체 컴포넌트 다크 모드 적용 | ★★☆ | 모든 색상 대응 |

**산출물**: 완전한 다크 모드 지원

---

### Phase 7: SEO 및 PWA
**브랜치**: `phase5/seo-pwa`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| 메타 태그 설정 | ★★☆ | title, description, keywords |
| Open Graph 태그 | ★★☆ | og:title, og:image 등 |
| JSON-LD 구조화 데이터 | ★★★ | GovernmentOffice 스키마 |
| manifest.json 생성 | ★★☆ | PWA 설정 |
| 앱 아이콘 생성 | ★★☆ | 다양한 크기 |
| Service Worker 설정 | ★★☆ | next-pwa 또는 수동 |

**산출물**: SEO 최적화 + PWA 지원

---

### Phase 8: 최종 점검 및 배포
**브랜치**: `phase6/final-polish`

| 작업 | 난이도 | 상세 |
|------|--------|------|
| 접근성 검토 | ★★☆ | aria-label, 키보드 네비게이션 |
| 기본 테스트 작성 | ★★☆ | 핵심 컴포넌트 테스트 |
| 빌드 테스트 | ★☆☆ | Static Export 확인 |
| 성능 최적화 | ★★☆ | 이미지, 번들 크기 |
| README 작성 | ★☆☆ | 프로젝트 설명 |

**산출물**: 배포 준비 완료된 프로젝트

---

## 전체 일정 요약

| Phase | 브랜치 | 난이도 | 주요 작업 |
|-------|--------|--------|----------|
| 1 | `phase1/project-setup` | ★☆☆ | Next.js 초기 설정 |
| 2 | `phase1/data-conversion` | ★★☆ | 데이터 변환 및 정제 |
| 3 | `phase2/core-components` | ★★★ | UI 컴포넌트 구현 |
| 4 | `phase2/search-feature` | ★★☆ | 검색 기능 완성 |
| 5 | `phase3/styling-ux` | ★★★ | Apple 스타일 적용 |
| 6 | `phase4/dark-mode` | ★★☆ | 다크 모드 |
| 7 | `phase5/seo-pwa` | ★★★ | SEO + PWA |
| 8 | `phase6/final-polish` | ★★☆ | 최종 점검 |

---

## 진행 체크리스트

- [ ] **Phase 1**: 프로젝트 초기 설정 → dev 머지
- [ ] **Phase 2**: 데이터 변환 → dev 머지
- [ ] **Phase 3**: 핵심 컴포넌트 → dev 머지
- [ ] **Phase 4**: 검색 기능 → dev 머지
- [ ] **Phase 5**: 스타일링 및 UX → dev 머지
- [ ] **Phase 6**: 다크 모드 → dev 머지
- [ ] **Phase 7**: SEO 및 PWA → dev 머지
- [ ] **Phase 8**: 최종 점검 → dev 머지
- [ ] **MVP 완성**: dev → main 머지
- [ ] **배포**: Vercel 연결 + 커스텀 도메인

---

## 배포 후 추가 작업 (수동)

1. **Google Form 생성** 및 URL 설정
2. **Vercel 도메인 연결**
3. **Google Search Console 등록**

---

## 버전 정보

- 계획 버전: 1.0
- 작성일: 2026-01-19
