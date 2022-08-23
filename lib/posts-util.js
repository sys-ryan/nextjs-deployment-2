import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostsFiles = async () => {
  return await fs.readdir(postsDirectory);
};

export const getPostData = async (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = async () => {
  const postFiles = await getPostsFiles();

  const allPosts = await Promise.all(
    postFiles.map((postFile) => {
      return getPostData(postFile);
    })
  );

  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return sortedPosts;
};

export const getFearuedPosts = async () => {
  const allPosts = await getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
