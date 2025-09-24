import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function Home() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-8">
      <h1 className="text-3xl font-bold">My Blog</h1>
      <ul className="space-y-4">
        {posts.map(p => (
          <li key={p.slug} className="border-b pb-4">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold underline">
              {p.title}
            </Link>
            <p className="text-sm opacity-70">{p.date}</p>
            {p.description && <p className="mt-1">{p.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
