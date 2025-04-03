"use client";

import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-slate-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        소개
      </motion.h1>
      
      <motion.div 
        className="space-y-6 text-secondary-700 dark:text-secondary-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="text-xl">
          안녕하세요! 이 블로그는 Next.js와 마크다운을 사용한 모던한 블로그 플랫폼입니다.
        </p>
        
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10 mb-4">
          기술 스택
        </h2>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Next.js 15 - 리액트 프레임워크</li>
          <li>Tailwind CSS - 스타일링</li>
          <li>Framer Motion - 애니메이션</li>
          <li>Markdown - 콘텐츠 작성</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10 mb-4">
          기능
        </h2>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>마크다운으로 글 작성</li>
          <li>반응형 디자인</li>
          <li>다크 모드 지원</li>
          <li>애니메이션 효과</li>
          <li>직관적인 UI/UX</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-10 mb-4">
          연락처
        </h2>
        
        <div className="flex items-center space-x-6 text-secondary-600 dark:text-secondary-400">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center"
          >
            <FiGithub className="mr-2" size={20} />
            GitHub
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center"
          >
            <FiTwitter className="mr-2" size={20} />
            Twitter
          </a>
          <a 
            href="mailto:email@example.com" 
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center"
          >
            <FiMail className="mr-2" size={20} />
            이메일
          </a>
        </div>
      </motion.div>
    </div>
  );
}