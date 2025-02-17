import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import { page_routes } from "@/lib/routes-config";
import { Badge } from "@/components/ui/badge";
import Link from "@/components/markdown/link";
import { ExternalLink } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  if (!res) notFound();
  return (
    <div className='flex items-start gap-10'>
      <div className='flex-[4.5] pt-10'>
        <DocsBreadcrumb paths={slug} />
        <Typography>
          <h1 className='text-3xl !-mt-0.5'>{res.frontmatter.title}</h1>
          <div className='flex gap-2 flex-wrap'>
            {res.frontmatter.resources?.map((res, index) => (
              <Link target='_blank' key={index} href={res.src}>
                <Badge
                  variant={"secondary"}
                  className='flex items-center gap-2'
                >
                  <ExternalLink size={16} />
                  {res.title}
                </Badge>
              </Link>
            ))}
          </div>
          <div>{res.content}</div>
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} />
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);
  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
