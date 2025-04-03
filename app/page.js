// app/page.js (서버 컴포넌트)
import { getSortedPostsData } from '../lib/posts';
import HomePage from '../components/HomePage';

export default function Page() {
  const allPostsData = getSortedPostsData();

  return <HomePage allPostsData={allPostsData} />;
}