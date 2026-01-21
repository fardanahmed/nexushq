import DemoNavbar from '@/components/home/DemoNavbar';
import DemoFooter from '@/components/home/DemoFooter';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DemoNavbar />
      <main className="flex-1">{children}</main>
      <DemoFooter />
    </div>
  );
}
