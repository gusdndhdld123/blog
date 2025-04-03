"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/Button';
import { FiSave, FiEye, FiTag } from 'react-icons/fi';

// 카테고리 옵션
const categoryOptions = [
  { value: 'schedule', label: '시험 일정' },
  { value: 'certification', label: '자격증 정보' },
  { value: 'tips', label: '공부 팁' },
  { value: 'general', label: '일반' },
];

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [preview, setPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSaving(true);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, category }),
      });
      
      if (!response.ok) {
        throw new Error('저장에 실패했습니다');
      }
      
      const { id } = await response.json();
      router.push(`/posts/${id}`);
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
        새 글 작성하기
      </h1>
      
      <div className="mb-6 flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setPreview(!preview)}
          className="inline-flex items-center"
        >
          <FiEye className="mr-2" />
          {preview ? '편집' : '미리보기'}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleSave}
          isLoading={isSaving}
          className="inline-flex items-center"
        >
          <FiSave className="mr-2" />
          저장하기
        </Button>
      </div>
      
      <div>
        {!preview ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-2 text-secondary-700 dark:text-secondary-300">
                제목
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 px-4 py-2 text-slate-900 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="제목을 입력하세요"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block mb-2 text-secondary-700 dark:text-secondary-300">
                카테고리
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 px-4 py-2 text-slate-900 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none pl-10"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500 dark:text-secondary-400">
                  <FiTag size={18} />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="content" className="block mb-2 text-secondary-700 dark:text-secondary-300">
                내용 (마크다운 지원)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 px-4 py-2 text-slate-900 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                placeholder="내용을 입력하세요 (마크다운 문법 지원)"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 rounded-lg p-6">
            <div className="mb-3">
              <span className="category-tag">
                {categoryOptions.find(option => option.value === category)?.label || '일반'}
              </span>
            </div>
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <h1>{title || '제목'}</h1>
              
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: processMarkdown(content) }} />
              ) : (
                <p className="text-secondary-500 dark:text-secondary-400">내용을 입력해주세요...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function processMarkdown(markdown) {
  // 간단한 마크다운 처리
  let html = markdown
    // 헤딩 처리
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    // 굵게 처리
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 기울임 처리
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 링크 처리
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // 코드 블록 처리
    .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
    // 인라인 코드 처리
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 리스트 처리
    .replace(/^\- (.*$)/gm, '<li>$1</li>');
  
  // 단락 처리
  html = '<p>' + html.replace(/\n\n/g, '</p><p>') + '</p>';
  
  // 리스트 수정
  html = html.replace(/<li>.*?<\/li>/gs, match => {
    return '<ul>' + match + '</ul>';
  });
  
  return html;
}