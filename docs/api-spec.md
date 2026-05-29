# 틀딱 퀴즈 - API 명세서 (Supabase 기반)

## DB 스키마

### `quizzes` 테이블

| 컬럼 | 타입 | 제약 | 설명 |
|---|---|---|---|
| `id` | int8 | PK, auto increment | 퀴즈 ID |
| `question_text` | text | NOT NULL | 문제 텍스트 |
| `question_image` | text | nullable | Storage public URL |
| `options` | text[] | NOT NULL | 선택지 4개 배열 |
| `correct_answer` | int2 | NOT NULL | 정답 번호 (1~4) |
| `custom_message` | text | NOT NULL | 정답 해설 |
| `rates` | jsonb | NOT NULL | `{"10대":45,"20대":85,"30대":95,"40대":75}` |
| `weight` | int2 | NOT NULL, default 1 | 출제 가중치 (1~3) |
| `created_at` | timestamptz | default now() | 생성일시 |

---

## Storage

### 버킷: `quiz-images`

| 항목 | 설정 |
|---|---|
| 버킷명 | `quiz-images` |
| 접근 | Public |
| 허용 파일 형식 | image/png, image/jpeg, image/webp |
| 파일 경로 규칙 | `{quiz_id}-{timestamp}.{ext}` |

---

## Auth

- Provider: Email/Password
- 관리자 계정 1개 Supabase 대시보드에서 직접 생성
- 일반 사용자 회원가입 없음

---

## RLS (Row Level Security)

### `quizzes` 테이블

| 정책 | 대상 | 조건 |
|---|---|---|
| SELECT | 전체 (anon 포함) | 항상 허용 |
| INSERT | 인증된 사용자 | `auth.role() = 'authenticated'` |
| UPDATE | 인증된 사용자 | `auth.role() = 'authenticated'` |
| DELETE | 인증된 사용자 | `auth.role() = 'authenticated'` |

### `quiz-images` Storage

| 정책 | 대상 | 조건 |
|---|---|---|
| SELECT (download) | 전체 | 항상 허용 |
| INSERT (upload) | 인증된 사용자 | `auth.role() = 'authenticated'` |
| DELETE | 인증된 사용자 | `auth.role() = 'authenticated'` |

---

## Supabase 쿼리 목록

### 퀴즈 전체 조회 (사용자)
```ts
const { data } = await supabase
  .from('quizzes')
  .select('*')
```

### 퀴즈 단건 조회 (관리자 수정용)
```ts
const { data } = await supabase
  .from('quizzes')
  .select('*')
  .eq('id', id)
  .single()
```

### 퀴즈 추가
```ts
const { error } = await supabase
  .from('quizzes')
  .insert({ question_text, options, correct_answer, custom_message, rates, weight, question_image })
```

### 퀴즈 수정
```ts
const { error } = await supabase
  .from('quizzes')
  .update({ question_text, options, correct_answer, custom_message, rates, weight, question_image })
  .eq('id', id)
```

### 퀴즈 삭제
```ts
const { error } = await supabase
  .from('quizzes')
  .delete()
  .eq('id', id)
```

### 이미지 업로드
```ts
const { data } = await supabase.storage
  .from('quiz-images')
  .upload(`${id}-${Date.now()}.png`, file)

const { data: { publicUrl } } = supabase.storage
  .from('quiz-images')
  .getPublicUrl(data.path)
```

### 이미지 삭제
```ts
await supabase.storage
  .from('quiz-images')
  .remove([filePath])
```

### 로그인
```ts
const { error } = await supabase.auth.signInWithPassword({ email, password })
```

### 로그아웃
```ts
await supabase.auth.signOut()
```

### 세션 확인
```ts
const { data: { session } } = await supabase.auth.getSession()
```
