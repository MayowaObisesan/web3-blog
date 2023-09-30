import { toast } from "react-toastify";
import { useConnection } from "../context/connection";
import { useState } from "react";
import useCreatePost from "../hooks/useCreatePost";
import { M_NOT_CONNECTED, supportedChains } from "../constants";

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [sendingTx, setSendingTx] = useState(false);
    const { connect, isActive, account, switchToChain } = useConnection();
    const createPost = useCreatePost();

    const handleCreatePost = async () => {
        console.log("Inside handle createPost");
        if (!content)
            return toast.info("Type a post");
        if (!isActive) return toast.info(M_NOT_CONNECTED);
        try {
            setSendingTx(true);
            const tx = await createPost(content);
            const receipt = await tx.wait();
            if (receipt.status === 0) return toast.error("Transaction failed");
            toast.success("Post created successfully");
        } catch (err) {
            console.log("Error creating post: ", err);
            if (err.info.error.code === 4001) {
                return toast.error("You rejected the request");
            }
            toast.error("Check that you connected your wallet");
        } finally {
            setSendingTx(false);
        }
    };

    return (
        <section className="">
            <div className="hero w-screen min-h-screen">
                <div className="hero-content flex-col flex-grow-1 lg:flex-row min-w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Create Posts</h1>
                        <p className="py-6">Create a post to begin engaging with other users</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-4xl h-screen shadow-2xl bg-gray-100">
                        <div className="card-body h-[500px]">
                            <div className="form-control h-full">
                                <label className="label">
                                    <span className="label-text text-3xl">Post Content</span>
                                </label>
                                <textarea
                                    placeholder="Type something that engages your audience"
                                    className="textarea textarea-bordered textarea-lg w-full max-w-full h-full"
                                    onClick={(e) => setContent(e.target.value)}></textarea>
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div> */}

                            {
                                isActive
                                    ? (
                                        <div className="form-control mt-6">
                                            {
                                                sendingTx
                                                    ? <button className="btn btn-primary cursor-not-allowed">
                                                        <span className="loading loading-spinner"></span>
                                                        Creating Post
                                                    </button>
                                                    : <button className={"btn btn-primary"} onClick={handleCreatePost}>Post</button>
                                            }
                                        </div>
                                    )
                                    : account
                                        ? (
                                            <div
                                                onClick={() =>
                                                    switchToChain(
                                                        supportedChains[0]
                                                    )
                                                }
                                                className="cursor-pointer w-full rounded-md bg-blue-400 p-3 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-center"
                                            >
                                                Switch Network
                                            </div>
                                        )
                                        : (
                                            <div
                                                onClick={connect}
                                                disabled={sendingTx}
                                                className="cursor-pointer w-full rounded-md bg-blue-400 p-3 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-center"
                                            >
                                                Connect to Network
                                            </div>
                                        )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default CreatePost;