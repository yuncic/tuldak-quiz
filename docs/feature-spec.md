# 틀딱 퀴즈 - 관리자 기능 명세서

## 개요

기존 정적 JSON 데이터(`dentalQuizData.json`)를 Supabase DB로 이전하고,
관리자가 퀴즈를 관리할 수 있는 어드민 페이지를 추가한다.

---

## 기술 스택 추가

| 항목 | 기술 |
|---|---|
| DB | Supabase PostgreSQL |
| Storage | Supabase Storage |
| Auth | Supabase Auth (이메일/비밀번호) |
| SDK | @supabase/supabase-js |

---

## 기능 목록

### 1. 관리자 인증

| 기능 | 설명 |
|---|---|
| 로그인 | 이메일/비밀번호로 로그인 |
| 로그아웃 | 세션 종료 |
| 라우트 보호 | 비로그인 상태에서 `/admin` 접근 시 `/admin/login`으로 리다이렉트 |

- 관리자 계정은 Supabase Auth에 단일 계정으로 등록
- 일반 사용자는 Auth 기능 사용 안 함

---

### 2. 퀴즈 목록 조회

- `/admin` 진입 시 전체 퀴즈 목록 표시
- 표시 항목: `id`, `question_text`, `weight`, 등록 이미지 여부
- 퀴즈 추가 / 수정 / 삭제 버튼 제공

---

### 3. 퀴즈 추가

입력 항목:

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `question_text` | string | ✓ | 문제 텍스트 |
| `question_image` | file | | 이미지 업로드 (Supabase Storage) |
| `options` | string[4] | ✓ | 선택지 4개 |
| `correct_answer` | number (1~4) | ✓ | 정답 번호 |
| `custom_message` | string | ✓ | 정답 해설 |
| `rates` | object | ✓ | 연령대별 정답률 (10대/20대/30대/40대) |
| `weight` | number (1~3) | ✓ | 출제 가중치 |

- 이미지 업로드 시 Supabase Storage에 저장 후 public URL을 `question_image`에 저장
- 저장 성공 시 목록으로 이동

---

### 4. 퀴즈 수정

- 기존 데이터 불러와서 폼에 채워줌
- 이미지 교체 시 기존 Storage 파일 삭제 후 새 파일 업로드
- 수정 성공 시 목록으로 이동

---

### 5. 퀴즈 삭제

- 삭제 전 확인 모달 표시
- DB 레코드 삭제 + Storage 이미지 삭제 (이미지가 있는 경우)

---

### 6. 사용자 퀴즈 서빙 변경

- 기존: `dentalQuizData.json` import
- 변경: Supabase DB에서 quizzes 전체 조회
- `resultRanges`는 당분간 JSON 유지 (변경 빈도 낮음)

---

## 라우트 구조

```
/                → 기존 퀴즈 서비스 (변경 없음)
/admin/login     → 관리자 로그인
/admin           → 퀴즈 목록 (인증 필요)
/admin/quiz/new  → 퀴즈 추가 (인증 필요)
/admin/quiz/:id  → 퀴즈 수정 (인증 필요)
```

---

## 환경변수

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```
