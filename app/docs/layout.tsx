import { Footer } from "@/components/footer";
import { Leftbar } from "@/components/leftbar";
import { Navbar } from "@/components/navbar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex items-start gap-8'>
        <Leftbar key='leftbar' />
        <div className='px-2 lg:px-0 flex-[6]'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
