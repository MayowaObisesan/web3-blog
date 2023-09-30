import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getCrowdfundContract, getInkContract } from "../utils";
import { toast } from "react-toastify";
import { M_NOT_CONNECTED } from "../constants";

const useCreatePost = () => {
    const { isActive, provider } = useConnection();
    const createPost = useCallback(
        async (content) => {
            if (!content)
                return toast.info("Please provide all valeus");
            if (!isActive) return toast.info(M_NOT_CONNECTED);
            const contract = await getInkContract(provider, true);
            const estimatedGas = await contract.createPost.estimateGas(
                content,
            );

            return contract.createPost(content, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [isActive, provider]
    );

    return createPost;
};

export default useCreatePost;
