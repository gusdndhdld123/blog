import { savePost } from '../../../lib/posts';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, content, category } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }
    
    const id = savePost({ title, content, category });
    
    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { error: '포스트 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}