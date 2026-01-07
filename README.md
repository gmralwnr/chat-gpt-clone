# Next.js App Router 기반 ChatGPT 프로젝트

## 📌 프로젝트 개요
본 프로젝트는 **Next.js App Router**를 기반으로 한 ChatGPT 스타일의 웹 애플리케이션입니다.  
OpenAI API를 연동하여 실시간 AI 채팅 기능을 제공하며, 상태 관리와 데이터 영속성을 고려한 구조로 설계되었습니다.

---

## 🛠 기술 스택

### Frontend
- **Next.js (App Router)**
- **React**
- **Zustand** – 전역 상태 관리

### Backend / Infra
- **Node.js 18 이상**
- **OpenAI API** – AI 채팅 기능 구현
- **PostgreSQL** – 대화 데이터 저장
- **Neon Service** – Serverless PostgreSQL 환경 구성

---

## ✨ 주요 기능
- OpenAI API 연동을 통한 AI 채팅 기능
- Zustand 기반 전역 상태 관리
- 채팅 메시지 상태 관리 및 UI 반영
- PostgreSQL을 활용한 채팅 데이터 저장
- Neon Service를 통한 클라우드 DB 연동
- Next.js App Router 기반 서버 컴포넌트 구조 적용

---

## 📁 프로젝트 구조 (예시)

```text
app/
 ├─ api/            # OpenAI API 및 서버 액션
 ├─ chat/           # 채팅 UI 페이지
 ├─ layout.tsx
 └─ page.tsx
store/
 └─ chatStore.ts    # Zustand 전역 상태
lib/
 ├─ openai.ts       # OpenAI API 설정
 └─ db.ts           # Neon(PostgreSQL) 연결




Prerequisites
To follow this quickstart, you'll need:

Node.js 18+ and pnpm installed on your local development machine.
An OpenAI API key.
If you haven't obtained your OpenAI API key, you can do so by signing up on the OpenAI website.


