import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getCrowdfundContract, getInkContract } from "../utils";

const usePostCount = () => {
    const [postCount, setPostCount] = useState(0);
    const { provider } = useConnection();

    useEffect(() => {
        const fetchpostCount = async () => {
            try {
                const contract = await getInkContract(provider, false);
                const allPosts = await contract.getPosts(0, 100);
                const validPosts = allPosts.filter(post => post[2] !== "");
                // console.log(validPosts.length);
                setPostCount(validPosts.length);
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        };

        fetchpostCount();
    }, [provider]);
    return postCount;
};

export default usePostCount;
