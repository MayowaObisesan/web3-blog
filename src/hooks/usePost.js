import { useCallback, useEffect, useState } from "react";
import useCampaignCount from "./useCampaignCount";
import { useConnection } from "../context/connection";
import {
    getCrowdFundInterface,
    getCrowdfundContractWithProvider,
    getInkInterface,
    getMulticall2ContractWithProvider,
} from "../utils";
import { crowdfundContractAddress, inkAddress } from "../constants/addresses";
import usePostCount from "./usePostCount";

const usePost = (id) => {
    const [post, setPost] = useState(null);
    const [state, setState] = useState("LOADING");
    const { provider } = useConnection();
    const postLength = usePostCount();

    const fetchPost = useCallback(async () => {
        const postId = Number(id);
        if (postLength < 1) return;
        console.log(postId)
        // if (postId || postId > postLength)
        if (postId > postLength)
            return setState("NOT_FOUND");
        console.log(postLength);
        try {
            const multicall2Contract =
                getMulticall2ContractWithProvider(provider);

            const croundFundInterface = getCrowdFundInterface();
            const inkInterface = getInkInterface();

            const calls = [
                {
                    target: inkAddress,
                    callData: inkInterface.encodeFunctionData("getPost", [
                        postId,
                    ]),
                },
                // {
                //     target: inkAddress,
                //     callData: inkInterface.encodeFunctionData(
                //         "getContributors",
                //         [postId]
                //     ),
                // },
            ];

            const callsResult = (
                await multicall2Contract.aggregate.staticCall(calls)
            )[1].toArray();
            console.log(callsResult);

            const post = inkInterface
                .decodeFunctionResult("getPost", callsResult[0])
                .toArray().flat();
            // const campaignContributors = inkInterface
            //     .decodeFunctionResult("getContributors", callsResult[1])
            //     .toArray();

            console.log(post.flat());
            console.log(post[2]);

            // Select the first item returned from the post returned
            if (post[2] === "") {
                setState("NOT_FOUND");
                return;
            }

            const postDetails = {
                id: Number(post[0]),
                owner: post[1],
                content: post[2],
                timePosted: Number(post[3]),
                tips: Number(post[4])
                // isActive: post[4],
                // fundingBalance: post[5],
                // contributors: campaignContributors[0].toArray(),
            };
            console.log(postDetails)

            setPost(postDetails);
            setState("LOADED");
        } catch (error) {
            console.error("Error fetching posts:", error);
            setState("NOT_FOUND");
        }
    }, [postLength, id, provider]);

    useEffect(() => {
        fetchPost();
    }, [postLength, fetchPost, id, provider]);

    // useEffect(() => {
    //     // Listen for event
    //     const handleNewPostEvent = (_ID) => {
    //         fetchPost();
    //     };

    //     const contract = getCrowdfundContractWithProvider(provider);
    //     contract.on("NewPost", handleNewPostEvent);

    //     return () => {
    //         contract.off("NewPost", handleNewPostEvent);
    //     };
    // }, [fetchPost, provider]);
    return { post, state };
};

export default usePost;
