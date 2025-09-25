import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { mdToHtml } from "@/lib/markdown";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { meta } = getPostBySlug(params.slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const { meta, raw } = getPostBySlug(params.slug);
    const html = await mdToHtml(raw);
    return (
      <article className="prose mx-auto max-w-2xl p-6">
        <h1>{meta.title}</h1>
        <p className="text-sm opacity-70">{meta.date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    );
  } catch {
    notFound();
  }
}
// 위 코드는 Next.js의 동적 라우팅과 정적 사이트 생성을 활용하여 블로그 게시물 페이지를 렌더링하는 컴포넌트입니다.
// getAllSlugs 함수는 모든 게시물의 슬러그 목록을 반환하고, generateStaticParams 함수는 각 슬러그에 대한 정적 경로를 생성합니다.
// getPostBySlug 함수는 특정 슬러그에 해당하는 게시물의 메타데이터와 본문을 반환하며, mdToHtml 함수는 마크다운 본문을 HTML로 변환합니다.
// generateMetadata 함수는 각 게시물의 메타데이터를 설정하여 SEO에 활용됩니다.
// PostPage 컴포넌트는 게시물의 제목, 날짜, 본문을 렌더링하며, 게시물이 존재하지 않을 경우 notFound 함수를 호출하여 404 페이지를 표시합니다.
