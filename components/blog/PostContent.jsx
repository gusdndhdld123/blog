"use client";

import { FiCalendar, FiArrowLeft, FiTag } from 'react-icons/fi';
import Link from 'next/link';
import { categories } from '../../lib/posts';

export function PostContent({ post }) {
  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const categoryLabel = post.category ? (categories[post.category] || post.category) : '일반';

  return (
    <article className="max-w-3xl mx-auto my-8 px-4">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          <span>모든 포스트</span>
        </Link>
      </div>
      
      <div className="mb-3">
        <span className="category-tag">
          <FiTag className="mr-1" />
          {categoryLabel}
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
        {post.title}
      </h1>
      
      <div className="date-display mb-8">
        <FiCalendar className="mr-2" />
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>
      
      <div 
        className="prose dark:prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}