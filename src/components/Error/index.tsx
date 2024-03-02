import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="center">
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>잘못 된 경로입니다.</p>
      <Link href="/">돌아가기</Link>
    </div>
  );
}
