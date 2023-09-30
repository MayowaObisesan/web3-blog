import PostCard from "../component/PostCard";
import usePosts from "../hooks/useAllPosts";

const Posts = () => {
    const posts = usePosts();
    console.log(posts);

    return (
        <div className="grid grid-cols-3 gap-12 px-5 py-10">
            {!!posts &&
                posts.map((post, index) => (
                    <>
                        <PostCard key={index} post={post} />
                    </>
                ))}
        </div>
    );
};

export default Posts;
