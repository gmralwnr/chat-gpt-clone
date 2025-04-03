import Image from 'next/image';
export function Empty() {
    return <div className='flex flex-col items-center justify-center w-full h-full '>
        <Image width={100} height={100} src="/logo100.png" alt="empty"></Image>
        <h3 className='text-xl md:text-2xl font-bold'>무엇을 도와드릴까요?</h3>
    </div>
}