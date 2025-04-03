"use client";

import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#ffffff] dark:bg-secondary-900 border-t border-secondary-100 dark:border-secondary-800 mt-12">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 소개 */}
          <div className="md:col-span-2">
            <Link href="/">
              <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                시험정보<span className="text-accent-500">블로그</span>
              </h2>
            </Link>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4 max-w-md">
              시험과 자격증 준비에 필요한 모든 정보를 제공합니다. 
              일정, 팁, 그리고 합격을 위한 다양한 지식을 공유합니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="#" className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">카테고리</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/schedule" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  시험 일정
                </Link>
              </li>
              <li>
                <Link href="/category/certification" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  자격증 정보
                </Link>
              </li>
              <li>
                <Link href="/category/tips" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  공부 팁
                </Link>
              </li>
            </ul>
          </div>

          {/* 유용한 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/write" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  글쓰기
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  전체 글 보기
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-100 dark:border-secondary-800 mt-12 pt-6 text-center text-secondary-500 dark:text-secondary-400 text-sm">
          <p>© {currentYear} 시험정보블로그. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
}