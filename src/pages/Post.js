import { useParams } from "react-router-dom"
import usePost from "../hooks/usePost";
import { formatDate } from "../utils";

const PostPage = ({ post }) => {
    return (
        <section className="flex flex-col justify-center w-6/12 mx-auto my-12">
            <div className="text-3xl py-12 text-center">
                {post?.content?.split(".")[0]}
            </div>
            <section className="flex justify-around font-bold">
                <div>{post?.id}</div>
                <div className="">
                    Author: {post?.owner}
                </div>
                <div>
                    {formatDate(post?.timePosted)}
                </div>
            </section>
            <div className="text-sm py-12 leading-10 text-xl">
                {post?.content}
            </div>
        </section>
    )
}

const Post = () => {
    const { id } = useParams();
    const { post, state } = usePost(id);

    return (
        <section>
            {
                state === "NOT_FOUND"
                && <div>Post Not Found</div>
            }
            {
                state === "LOADING"
                    ? <div>Page Loading</div>
                    : <PostPage post={post} />
            }
        </section>
    )
}

export default Post;