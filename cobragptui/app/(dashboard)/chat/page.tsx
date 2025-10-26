import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cyber Security Assistant</h1>
        <p className="text-muted">
          Ask questions about security incidents, threat analysis, or get help with security tasks.
        </p>
      </div>
      <ChatWindow />
    </div>
  );
}