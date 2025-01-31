import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Anchor from "./anchor";

interface RouteItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  items?: RouteItem[];
}

interface SubLinkProps extends RouteItem {
  noLink?: boolean;
  level: number;
  isSheet: boolean;
}

const SubLink: React.FC<SubLinkProps> = ({
  title,
  href,
  items,
  noLink = false,
  level,
  isSheet,
  icon,
}) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isCurrentPath = path === href || path.includes(href);
    if (isCurrentPath) setIsOpen(true);
  }, [href, path]);

  const LinkComponent = () => (
    <Anchor
      className={cn(
        "flex items-center gap-2 w-full rounded-md px-3 py-1.5 text-sm transition-colors",
        "hover:bg-gray-100 dark:hover:bg-zinc-900",
        "text-gray-600 dark:text-gray-400",
        "hover:text-gray-900 dark:hover:text-gray-50",
        path === href &&
          "bg-gray-100 dark:bg-zinc-900 font-medium text-gray-900 dark:text-gray-50"
      )}
      activeClassName='bg-gray-100 dark:bg-zinc-900 font-medium text-gray-900 dark:text-gray-50'
      href={href}
    >
      {icon && <span className='w-4 h-4'>{icon}</span>}
      {title}
    </Anchor>
  );

  const TitleComponent = () => {
    if (noLink) {
      return (
        <h4 className='px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100'>
          {title}
        </h4>
      );
    }

    return isSheet ? (
      <SheetClose asChild>
        <LinkComponent />
      </SheetClose>
    ) : (
      <LinkComponent />
    );
  };

  if (!items) {
    return (
      <div className='w-full'>
        <TitleComponent />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className='w-full'>
          <div
            className={cn(
              "flex items-center justify-between w-full rounded-md px-3 py-1.5",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              "group cursor-pointer"
            )}
          >
            <div className='flex items-center gap-2'>
              {icon && (
                <span className='w-4 h-4 text-gray-600 dark:text-gray-400'>
                  {icon}
                </span>
              )}
              <span
                className={cn(
                  "text-sm",
                  noLink
                    ? "font-medium text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-50"
                )}
              >
                {title}
              </span>
            </div>
            <span className='text-gray-600 dark:text-gray-400'>
              {isOpen ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className='flex flex-col space-y-1 mt-1'
            style={{
              marginLeft: `${level + 1 * 10}px`,
            }}
          >
            {items.map((innerLink) => (
              <SubLink
                key={href + innerLink.href}
                {...innerLink}
                href={`${href}${innerLink.href}`}
                level={level + 1}
                isSheet={isSheet}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SubLink;
