import Link from 'next/link';
import PaddedContainer from '@/components/common/PaddedContainer';

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PaddedContainer>
      <nav className="mb-8">
        <Link
          href="/dashboard"
          className="text-muted hover:text-primary transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </nav>
      {children}
    </PaddedContainer>
  );
}