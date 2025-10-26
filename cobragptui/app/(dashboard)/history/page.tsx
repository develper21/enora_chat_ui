'use client';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
}

const MOCK_HISTORY: ChatHistory[] = [
  {
    id: '1',
    title: 'Network Security Analysis',
    lastMessage: 'Analyzing potential vulnerabilities in the firewall configuration...',
    date: '2025-10-26T10:30:00Z',
    messageCount: 12
  },
  {
    id: '2',
    title: 'Incident Response Planning',
    lastMessage: 'Here\'s a comprehensive incident response plan template...',
    date: '2025-10-25T15:20:00Z',
    messageCount: 8
  },
  {
    id: '3',
    title: 'Malware Detection',
    lastMessage: 'Based on the symptoms, this appears to be a ransomware variant...',
    date: '2025-10-24T09:15:00Z',
    messageCount: 15
  }
];

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat History</h1>
        <button className="px-3 py-1.5 text-sm bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors">
          Clear History
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_HISTORY.map((chat) => (
          <div
            key={chat.id}
            className="bg-panel rounded-lg p-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{chat.title}</h3>
              <span className="text-xs text-muted">
                {new Date(chat.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted line-clamp-2 mb-2">
              {chat.lastMessage}
            </p>
            <div className="flex items-center text-xs text-muted">
              <span>{chat.messageCount} messages</span>
              <span className="mx-2">•</span>
              <button className="text-primary hover:underline">Continue Chat</button>
              <span className="mx-2">•</span>
              <button className="text-red-400 hover:underline">Move to Trash</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}