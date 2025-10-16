import { motion } from 'framer-motion';


type Props = {
role: 'user' | 'bot';
text: string;
};


export default function ChatBubble({ role, text }: Props) {
const isUser = role === 'user';
return (
<motion.div
initial={{ opacity: 0, y: 6 }}
animate={{ opacity: 1, y: 0 }}
className={`max-w-[78%] px-4 py-2 rounded-2xl shadow-sm whitespace-pre-wrap break-words ${
isUser
? 'bg-blue-600 text-white ml-auto rounded-br-sm'
: 'bg-white text-gray-900 rounded-bl-sm'
}`}
>
{text}
</motion.div>
);
}