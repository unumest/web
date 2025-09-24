import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export async function mdToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)           // Markdown 파싱
    .use(remarkGfm)             // 표/체크박스 등 GFM
    .use(remarkRehype)          // HTML AST로 변환
    .use(rehypeSanitize)        // XSS 방지
    .use(rehypeStringify)       // HTML 문자열 
    .process(markdown);
  return String(file);
}
// 위 코드는 Unified 라이브러리를 사용하여 마크다운을 HTML로 변환하는 함수입니다.
// remark-parse, remark-gfm, remark-rehype, rehype-sanitize, rehype-stringify 등의 플러그인을 사용하여 마크다운을 파싱하고 HTML로 변환합니다.
// rehype-sanitize 플러그인은 XSS 공격을 방지하기 위해 HTML을 정화하는 역할을 합니다.       