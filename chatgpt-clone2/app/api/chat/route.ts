import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30; // 핸들러 최대 실행시간

export async function POST(req: Request) { //request 로 사용하기 때문에 일반적인 req
    const { messages, model } = await req.json();

    const result = streamText({
        model: openai(model || 'gpt-3.5-turbo'), //gpt-3.5-turbo
        messages,
    });

    return result.toDataStreamResponse(); //클라이먼트에서 실시간 값을 받을 수 있음
}