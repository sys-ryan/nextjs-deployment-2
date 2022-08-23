import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFearuedPosts } from "../lib/posts-util";

export async function getStaticProps() {
  const featuredPosts = await getFearuedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 3600,
  };
}

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Ryan's Blog</title>
        <meta name="description" content="I post about programming and web development. " />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export default HomePage;
