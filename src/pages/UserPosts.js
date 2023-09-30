import PostCard from "../component/PostCard";
import useUserPosts from "../hooks/useUserPosts";

const UserPosts = () => {
    // const id = useParams();
    const { posts, isLoading } = useUserPosts();

    return (
        <section className={"relative w-3/4 mx-auto"}>
            <div className={"text-3xl p-6"}>Your Posts</div>

            {
                isLoading
                    ? <div>Loading Page</div>
                    : <div className="grid grid-cols-3 gap-10 px-5 py-10">
                        {!!posts &&
                            posts.map((post, index) => (
                                <>
                                    <PostCard key={index} post={post} />
                                </>
                            ))}
                    </div>
            }
        </section>
    )
}

export default UserPosts;