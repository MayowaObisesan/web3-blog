import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getInkContract, getInkTokenContract } from "../utils";
import { toast } from "react-toastify";
import { M_NOT_CONNECTED } from "../constants";

const useTip = () => {
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    const { isActive, provider } = useConnection();

    // useEffect(() => {
    //     const fetchPosts = async (dest, amount, postId) => {
    //         if (!account) return;
    //         try {
    //             const contract = await getInkContract(provider, false);
    //             const user = Array.from(await contract.tipOnPost(dest));
    //             setUser(user);
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //             toast.error("Error occurred");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchPosts();
    // }, [account, provider]);

    const approveAddressForTip = useCallback(
        async (dest) => {
            const tokenContract = await getInkTokenContract(provider, true);
            const estimatedGasLimitApprove = await tokenContract.approve.estimateGas(dest, "1000000000000"); // approves 1 InkToken
            console.log(estimatedGasLimitApprove);
            return tokenContract.approve(dest, "1000000000000");
        },
        [provider]
    );

    const tipPost = useCallback(
        async (dest, amount, postId) => {
            if (!dest || !amount || !postId)
                return toast.info("Please provide all valeus");
            if (!isActive) return toast.info(M_NOT_CONNECTED);

            await approveAddressForTip(dest);

            const contract = await getInkContract(provider, true);
            const estimatedGas = await contract.tipOnPost.estimateGas(
                dest,
                amount,
                postId
            );

            return contract.tipOnPost(dest, amount, postId, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [isActive, provider]
    );

    return tipPost;
};

export default useTip;
