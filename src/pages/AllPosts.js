import PostCard from "../component/PostCard";
import usePosts from "../hooks/useAllPosts";

const Posts = () => {
    const posts = usePosts();
    console.log(posts);

    return (
        <section className="w-10/12 mx-auto mt-12">
            <div className="mx-10 mt-10 text-2xl">Latest Blogs</div>
            <div className="grid grid-cols-3 gap-12 px-5 py-10">
                {!!posts &&
                    posts.map((post, index) => (
                        <>
                            <PostCard key={index} post={post} />
                        </>
                    ))}
            </div>
        </section>
    );
};

export default Posts;
