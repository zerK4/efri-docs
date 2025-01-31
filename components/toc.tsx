import { getDocsTocs } from "@/lib/markdown";
import TocObserver from "./toc-observer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Toc({ path }: { path: string }) {
  const tocs = await getDocsTocs(path);

  return (
    <div className='lg:flex hidden toc flex-[1.4] max-w-[15rem] py-9 sticky top-16 h-[96.95vh] px-2'>
      <div className='flex flex-col gap-3 w-full pl-2'>
        <h3 className='font-semibold text-sm'>On this page</h3>
        <ScrollArea className='pb-2 pt-0.5 overflow-y-auto'>
          <TocObserver data={tocs} />
        </ScrollArea>
      </div>
    </div>
  );
}
