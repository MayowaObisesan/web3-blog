import { formatEther } from "ethers";
import React, { useRef, useState } from "react";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import useTip from "../hooks/useTip";
import { useConnection } from "../context/connection";
import { toast } from "react-toastify";
import { M_TRANSACTION_FAILED } from "../constants";

const PostCard = ({ post }) => {
    const { isActive } = useConnection();
    const [sendingTx, setSendingTx] = useState(false);
    const [addTip, setAddTip] = useState(false);
    const [tipAmount, setTipAmount] = useState(0);
    const [tipSuccessful, setTipSuccessful] = useState(false);
    const postId = useRef(null);
    const postOwner = useRef(null);
    const postContent = useRef(null);
    const tipElem = useRef(null);

    const tipPost = useTip();

    const triggerTipPost = (evt) => {
        evt.preventDefault();
        setAddTip(!addTip);
    }

    const handleTipPost = async () => {
        if (!isActive) return toast.info("Pleast connect wallet");

        try {
            setSendingTx(true);
            const tx = await tipPost(
                postOwner.current.value,
                Number(tipAmount),
                Number(postId.current.value)
            );
            const receipt = await tx.wait();
            if (receipt.status === 0) return toast.error(M_TRANSACTION_FAILED);

            toast.success("Tip successful");
            setTipSuccessful(true);
        } catch (err) {
            console.log("error:", err);
            try {
                if (err.info.error.code === 4001) {
                    return toast.error("You rejected the request");
                }
            } catch (err) {
                return toast.error("Error occurred");
            }
            toast.error("Unable to tip user. We'll look into this.");
        } finally {
            setSendingTx(false);
        }
    }
    return (
        <Link to={`/post/${post.id}`} className="">
            <div className={"card w-full bg-base-200 shadow-xl"}>
                <div className={"card-body"}>
                    <input defaultValue={Number(post?.id)} ref={postId} hidden />
                    <input defaultValue={post?.poster} ref={postOwner} hidden />
                    <h2 className="card-title text-base my-3">{post?.content.split(".")[0]}</h2>
                    <div className={"py-6"} ref={postContent}>{post?.content}</div>
                    <div className="card-actions flex justify-end w-full" onClick={(e) => e.preventDefault()}>
                        {/* <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full" /> */}
                        {/* <button
                            className="btn btn-primary w-24"
                            onClick={handleTipPost}
                        >
                            Tip
                        </button> */}
                        <div className="join justify-end w-full">
                            {
                                addTip
                                && <input className="input input-bordered input-primary w-full join-item" placeholder="Amount in Eth" ref={tipElem} onChange={(e) => setTipAmount(e.target.value)} />
                            }
                            {
                                sendingTx
                                    ? <button className="btn btn-square">
                                        <span className="loading loading-spinner"></span>
                                    </button>
                                    : <button
                                        className={`btn join-item rounded-r-full btn-primary w-24 {addTip ? rounded-r-lg : rounded-lg}`}
                                        onClick={(tipAmount > 0 && tipElem.current?.value) ? handleTipPost : triggerTipPost}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                        Tip
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        // <div className="bg-white w-[30%] sm:max-w-sm border-2 border-blue-200 shadow-lg rounded-xl overflow-hidden py-8">
        // </div>
    );
};

export default PostCard;
