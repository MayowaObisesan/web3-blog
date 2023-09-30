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
            {/* <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-10">
                    <div
                        className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div
                                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">

                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">

                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-48"
                                                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    alt="logo" />
                                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                    We are The Lotus Team
                                                </h4>
                                            </div>

                                            <form>
                                                <p className="mb-4">Please login to your account</p>

                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        type="text"
                                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username" />
                                                    <label
                                                        for="exampleFormControlInput1"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Email address
                                                    </label>
                                                </div>


                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        type="password"
                                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput11"
                                                        placeholder="Password" />
                                                    <label
                                                        for="exampleFormControlInput11"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Password
                                                    </label>
                                                </div>


                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <button
                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="button"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                        style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                                                        Log in
                                                    </button>


                                                    <a href="#!">Forgot password?</a>
                                                </div>


                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Don't have an account?</p>
                                                    <button
                                                        type="button"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light">
                                                        Register
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>


                                    <div
                                        className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                        style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                            <h4 className="mb-6 text-xl font-semibold">
                                                We are more than just a company
                                            </h4>
                                            <p className="text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex
                                                ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <div className="hero w-full">
                <div className="hero-content flex-col flex-grow-1 pad-10 lg:flex-row min-w-full h-screen bg-orange-200">
                    <div className="text-center lg:text-left flex-col justify-start items-center bg-blue-200 h-full w-full max-w-5xl">
                        <h1 className="text-5xl font-bold">Create Posts</h1>
                        <p className="py-6">Create a post to begin engaging with other users</p>
                    </div>
                    <div className="flex-shrink-0 w-full max-w-4xl h-full shadow-2xl bg-gray-100">
                        <div className="card-body">
                            <div className="form-control h-full">
                                <label className="label">
                                    <span className="label-text text-3xl">Post Content</span>
                                </label>
                                <textarea
                                    placeholder="Type something that engages your audience"
                                    className="textarea textarea-bordered textarea-lg w-full max-w-full h-full"
                                    onClick={(e) => setContent(e.target.value)}></textarea>
                            </div>
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