"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FiHome, FiEdit, FiInfo, FiCalendar, FiBook, FiAward, FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from '../ui/ThemeToggle';

// 카테고리 데이터
const categories = [
  { id: 'schedule', name: '시험 일정', icon: <FiCalendar className="mr-2" /> },
  { id: 'certification', name: '자격증 정보', icon: <FiAward className="mr-2" /> },
  { id: 'tips', name: '공부 팁', icon: <FiBook className="mr-2" /> },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff]/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-secondary-100 dark:border-secondary-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">
              시험정보<span className="text-accent-500">블로그</span>
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="nav-link">
              <FiHome className="mr-1" />
              <span>홈</span>
            </Link>

            <div className="relative group">
              <button 
                className="nav-link"
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <FiBook className="mr-1" />
                <span>카테고리</span>
              </button>
              
              {/* 드롭다운 메뉴 */}
              <div 
                className={`absolute top-full left-0 w-48 bg-[#ffffff] dark:bg-secondary-900 shadow-lg rounded-lg py-2 transform transition-all origin-top-left ${
                  categoryMenuOpen 
                    ? 'scale-100 opacity-100' 
                    : 'scale-95 opacity-0 pointer-events-none'
                }`}
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                {categories.map(category => (
                  <Link 
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex items-center px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/write" className="nav-link">
              <FiEdit className="mr-1" />
              <span>글쓰기</span>
            </Link>
            
            <Link href="/about" className="nav-link">
              <FiInfo className="mr-1" />
              <span>소개</span>
            </Link>

            <div className="px-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              className="ml-4 p-1 text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="py-3 space-y-1 animate-slide-up">
            <Link
              href="/"
              className="flex items-center py-2 px-4 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiHome className="mr-3" />
              <span>홈</span>
            </Link>
            
            {/* 카테고리 메뉴 */}
            <div className="py-2 px-4">
              <div className="font-medium text-slate-900 dark:text-white mb-2">카테고리</div>
              <div className="pl-3 space-y-1 border-l-2 border-secondary-200 dark:border-secondary-700">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex items-center py-1 px-3 text-sm text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/write"
              className="flex items-center py-2 px-4 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiEdit className="mr-3" />
              <span>글쓰기</span>
            </Link>
            
            <Link
              href="/about"
              className="flex items-center py-2 px-4 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiInfo className="mr-3" />
              <span>소개</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}