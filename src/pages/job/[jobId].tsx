import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:3000/api/jobs/${params.id}`);
  const post = await response.json();

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const getJobs = await fetch("http://localhost:3000/api/jobs");
  const jobs = await getJobs.json();

  const paths = jobs?.jobs?.map((post) => ({
    params: {
      id: post.id.toString(123),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
