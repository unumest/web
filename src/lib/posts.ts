import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;              // YYYY-MM-DD
  description?: string;
  tags?: string[];
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

export function getAllSlugs(): string[] {
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): { meta: PostMeta; raw: string } {
  const full = path.join(POSTS_DIR, `${slug}.md`);
  const src = fs.readFileSync(full, "utf8");
  const { data, content } = matter(src);
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    description: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
  return { meta, raw: content };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(slug => getPostBySlug(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 최신 우선
}
// 위 코드는 파일 시스템에서 마크다운 파일을 읽어와서 메타데이터를 추출하고, 게시물 목록을 반환하는 함수들을 포함하고 있습니다.             
// gray-matter 라이브러리를 사용하여 마크다운 파일의 front matter를 파싱합니다.
// getAllSlugs 함수는 모든 게시물의 슬러그 목록을 반환하고, getPostBySlug 함수는 특정 슬러그에 해당하는 게시물의 메타데이터와 본문을 반환합니다.
// getAllPosts 함수는 모든 게시물의 메타데이터를 최신순으로 정렬하여 반환합니다.
// POSTS_DIR 상수는 게시물이 저장된 디렉토리 경로를 나타냅니다.
