import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeftIcon } from "lucide-react";
import DocsMenu from "./docs-menu";
import { Logo } from "./navbar";
import { Button } from "./ui/button";
import { DialogTitle } from "./ui/dialog";

export function Leftbar() {
  return (
    <aside className='md:flex border-r hidden px-2 flex-[1.7] max-w-[18rem] sticky top-16 flex-col h-[93.75vh] overflow-y-auto dark:bg-codeBackground'>
      <ScrollArea className='py-4'>
        <DocsMenu />
      </ScrollArea>
    </aside>
  );
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden flex'>
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col gap-4 px-0' side='left'>
        <DialogTitle className='sr-only'>Menu</DialogTitle>
        <SheetHeader>
          <SheetClose className='px-5' asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <div className='flex flex-col gap-4 overflow-y-auto'>
          <div className='mx-2 px-5'>
            <DocsMenu isSheet />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
