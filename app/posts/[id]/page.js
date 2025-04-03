import { getAllPostIds, getPostData } from '../../../lib/posts';
import { PostContent } from '../../../components/blog/PostContent';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);
  
  if (!postData) {
    notFound();
  }
  
  return <PostContent post={postData} />;
}