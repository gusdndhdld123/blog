import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// 카테고리 정보
export const categories = {
    'schedule': '시험 일정',
    'certification': '자격증 정보',
    'tips': '공부 팁',
    'general': '일반'
};

// 모든 포스트 데이터 가져오기
export function getSortedPostsData() {
    // posts 디렉토리 없을 경우 생성
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
        return [];
    }

    // 파일 이름 목록 얻기
    const fileNames = fs.readdirSync(postsDirectory);

    if (fileNames.length === 0) {
        return [];
    }

    const allPostsData = fileNames.map(fileName => {
        // 파일 이름에서 ".md" 제거해서 id 얻기
        const id = fileName.replace(/\.md$/, '');

        // 마크다운 파일을 문자열로 읽기
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matter로 파일 메타데이터 파싱
        const matterResult = matter(fileContents);

        // 데이터 객체 반환
        return {
            id,
            ...matterResult.data,
            content: matterResult.content
        };
    });

    // 날짜로 정렬
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// 모든 포스트 ID 가져오기 (동적 라우팅용)
export function getAllPostIds() {
    // posts 디렉토리 없을 경우 생성
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => {
        return {
            id: fileName.replace(/\.md$/, '')
        };
    });
}

// 포스트 데이터 가져오기
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);

    // 파일이 없으면 null 반환
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter로 파싱
    const matterResult = matter(fileContents);

    // remark를 사용해 마크다운을 HTML로 변환
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // 데이터 객체 반환
    return {
        id,
        contentHtml,
        ...matterResult.data
    };
}

// 새 포스트 저장
export function savePost({ title, content, category = 'general' }) {
    // posts 디렉토리 없을 경우 생성
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // 현재 날짜와 시간
    const date = new Date().toISOString();

    // 파일 이름 (날짜 + 제목)으로 ID 생성
    const id = `${Date.now()}-${title.toLowerCase().replace(/\s+/g, '-')}`;

    // 마크다운 파일 내용 생성
    const fileContent = `---
title: "${title}"
date: "${date}"
category: "${category}"
---

${content}`;

    // 파일 저장
    const filePath = path.join(postsDirectory, `${id}.md`);
    fs.writeFileSync(filePath, fileContent);

    return id;
}