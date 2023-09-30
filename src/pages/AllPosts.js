import PostCard from "../component/PostCard";
import usePosts from "../hooks/useAllPosts";

const Posts = () => {
    const posts = usePosts();
    console.log(posts);

    return (
        <section className="w-10/12 mx-auto mt-12">
            <section className="mx-8">
                <div className="mt-10 mb-4 text-4xl font-extrabold">Latest Blogs</div>
                <div className="leading-10">The latest and best articles curated from the best authors</div>
            </section>
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
