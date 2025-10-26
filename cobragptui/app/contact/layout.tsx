import PaddedContainer from '@/components/common/PaddedContainer';

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PaddedContainer>
      {children}
    </PaddedContainer>
  );
}