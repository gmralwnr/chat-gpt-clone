## Next.js App Router 기반 ChatGPT 프로젝트

### 📌 프로젝트 개요
Next.js App Router를 기반으로 한 ChatGPT 스타일 웹 애플리케이션입니다.  
OpenAI API를 연동하여 AI 채팅 기능을 제공하며, 상태 관리와 데이터 영속성을 고려한 구조로 설계되었습니다.

---

### 🛠 기술 스택

#### Frontend
- Next.js (App Router)
- React
- Zustand (전역 상태 관리)

#### Backend / Infra
- Node.js 18 이상
- OpenAI API
- PostgreSQL
- Neon Service (Serverless PostgreSQL)

---

### ✨ 주요 기능
- OpenAI API 연동 AI 채팅 기능
- Zustand 기반 전역 상태 관리
- 채팅 메시지 상태 관리 및 UI 반영
- PostgreSQL 기반 채팅 데이터 저장
- Neon Service를 활용한 클라우드 DB 연동
- App Router 기반 서버 컴포넌트 구조 적용

---

### 📁 프로젝트 구조 (예시)

```text
app/
 ├─ api/
 ├─ chat/
 ├─ layout.tsx
 └─ page.tsx
store/
 └─ chatStore.ts
lib/
 ├─ openai.ts
 └─ db.ts



Prerequisites
To follow this quickstart, you'll need:

Node.js 18+ and pnpm installed on your local development machine.
An OpenAI API key.
If you haven't obtained your OpenAI API key, you can do so by signing up on the OpenAI website.


