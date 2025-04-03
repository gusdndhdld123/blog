"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

export function PostCard({ post }) {
  return (
    <motion.div 
      className="border border-secondary-200 dark:border-secondary-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-secondary-900/20 transition-shadow bg-white dark:bg-secondary-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/posts/${post.id}`} className="block p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
          {post.title}
        </h3>
        
        <div className="flex items-center text-secondary-500 dark:text-secondary-400 mb-4">
          <FiCalendar className="mr-2" />
          <time dateTime={post.date}>
            {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
          </time>
        </div>
        
        <div className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
          {post.excerpt || post.content?.substring(0, 150) + '...'}
        </div>
        
        <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium">
          <span>더 읽기</span>
          <FiArrowRight className="ml-2" />
        </div>
      </Link>
    </motion.div>
  );
}