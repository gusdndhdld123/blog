// components/HomePage.jsx
"use client";

import { useState, useEffect } from 'react';
import { FiEdit, FiCalendar, FiAward, FiBook, FiArrowRight, FiChevronDown, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/Button';

const categories = [
    { id: 'schedule', name: '시험 일정', icon: <FiCalendar size={24} className="mb-3" />, description: '각종 시험 일정과 접수 정보' },
    { id: 'certification', name: '자격증 정보', icon: <FiAward size={24} className="mb-3" />, description: '다양한 자격증 취득 방법 및 팁' },
    { id: 'tips', name: '공부 팁', icon: <FiBook size={24} className="mb-3" />, description: '효율적인 학습법과 합격 비결' },
];

// 애니메이션 변수
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            duration: 0.6
        }
    }
};

const floatAnimation = {
    initial: { y: 0 },
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }
    }
};

// 검색창 컴포넌트
const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="relative mx-auto max-w-md mt-6 mb-2"
            initial={false}
            animate={{ width: isExpanded ? "100%" : "200px" }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <input
                    type="text"
                    placeholder="시험 또는 자격증 검색..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => setIsExpanded(false)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500" size={18} />
            </div>
            {isExpanded && (
                <motion.div
                    className="absolute top-full left-0 right-0 mt-2 p-2 bg-white dark:bg-secondary-900 rounded-lg shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="text-sm text-secondary-600 dark:text-secondary-400 p-2">
                        인기 검색어: 공인중개사, 토익, 컴퓨터활용능력, 한국사
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

// 카테고리 카드 컴포넌트
const CategoryCard = ({ category }) => {
    return (
        <motion.div
            whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="overflow-hidden"
        >
            <Link
                href={`/category/${category.id}`}
                className="card p-8 text-center group relative overflow-hidden transition-all duration-300 bg-gradient-to-b from-white to-secondary-50 dark:from-secondary-900 dark:to-secondary-800 border border-secondary-200 dark:border-secondary-700"
            >
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-primary-500"
                    whileHover={{ height: "4px" }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                    className="text-primary-500 flex justify-center mb-2"
                >
                    {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {category.description}
                </p>
                <div className="transition-transform duration-300 group-hover:translate-x-1">
          <span className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
            더 알아보기
            <FiArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
                </div>
            </Link>
        </motion.div>
    );
};

// 포스트 카드 컴포넌트
const PostCard = ({ post, index }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: index * 0.1 }}
            whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="overflow-hidden"
        >
            <Link
                href={`/posts/${post.id}`}
                className="card group block p-6 transition-all duration-300 border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900"
            >
                <div className="mb-3">
          <span className="category-tag">
            {post.category || '일반'}
          </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                </h3>

                <div className="date-display mb-4">
                    <FiCalendar className="mr-2" />
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </div>

                <div className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
                    {post.excerpt || post.content?.substring(0, 150) + '...'}
                </div>

                <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium transition-all duration-300 group-hover:font-semibold">
                    <span>더 읽기</span>
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
            </Link>
        </motion.div>
    );
};

// 스크롤 애니메이션 훅
const useScroll = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
};

export default function HomePage({ allPostsData }) {
    const scrollY = useScroll();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const parallaxOffset = scrollY * 0.2;

    return (
        <div className="py-8 overflow-hidden">
            {/* 히어로 섹션 */}
            <motion.section
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                className="relative py-16 px-4 mb-20 rounded-3xl overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)"
                }}
            >
                {/* 배경 장식 요소 */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                        backgroundSize: "30px 30px",
                        transform: `translateY(${parallaxOffset}px)`
                    }}
                />

                <div className="container mx-auto relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: -20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }
                                }
                            }}
                            className="text-4xl sm:text-5xl font-bold mb-6 text-white"
                        >
                            시험 합격을 위한<br />
                            모든 정보를 한곳에서
                        </motion.h1>

                        <motion.p
                            variants={slideUp}
                            className="text-xl text-white/90 mb-8"
                        >
                            시험 일정부터 자격증 정보, 합격을 위한 꿀팁까지
                            필요한 모든 정보를 찾아보세요.
                        </motion.p>

                        <SearchBar />

                        <motion.div
                            variants={staggerContainer}
                            className="flex flex-wrap justify-center gap-4 mt-8"
                        >
                            <motion.div variants={slideUp}>
                                <Link href="/category/schedule" className="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center shadow-lg hover:shadow-xl">
                                    시험 일정 확인하기
                                </Link>
                            </motion.div>

                            <motion.div variants={slideUp}>
                                <Link href="/write" className="bg-primary-600 text-white hover:bg-primary-700 border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors flex items-center shadow-lg hover:shadow-xl">
                                    <FiEdit className="mr-2" />
                                    글 작성하기
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white opacity-80"
                >
                    <FiChevronDown size={24} />
                </motion.div>
            </motion.section>

            {/* 카테고리 섹션 */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="mb-20"
            >
                <div className="container mx-auto">
                    <motion.h2
                        variants={slideUp}
                        className="section-title text-center mb-12"
                    >
                        주요 카테고리
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 최신 글 섹션 */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="mb-16"
            >
                <div className="container mx-auto">
                    <motion.h2
                        variants={slideUp}
                        className="section-title text-center mb-12"
                    >
                        최신 게시물
                    </motion.h2>

                    {allPostsData.length === 0 ? (
                        <motion.div
                            variants={slideUp}
                            className="text-center py-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl"
                        >
                            <h3 className="text-xl text-secondary-600 dark:text-secondary-400">아직 작성된 포스트가 없습니다.</h3>
                            <p className="mt-2 text-secondary-500 dark:text-secondary-500">첫 번째 글을 작성해보세요!</p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/write"
                                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    <FiEdit className="mr-2" />
                                    첫 글 작성하기
                                </Link>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {allPostsData.map((post, index) => (
                                <PostCard key={post.id} post={post} index={index} />
                            ))}
                        </div>
                    )}

                    <motion.div
                        variants={slideUp}
                        className="text-center mt-12"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/archive"
                                className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-slate-900 dark:text-white transition-colors shadow hover:shadow-md"
                            >
                                모든 게시물 보기
                                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}