import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getInkContract } from "../utils";
import usePostCount from "./usePostCount";

const useUserPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { account, provider } = useConnection();
    const postLength = usePostCount();


    useEffect(() => {
        const fetchPosts = async () => {
            if (!account) return;
            try {
                const contract = await getInkContract(provider, false);
                const allPosts = Array.from(await contract.getUserPosts(account));
                setPosts(allPosts);
            } catch (error) {
                console.error("Error fetching post count:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [account, provider, postLength]);
    return { posts, loading };
};

export default useUserPosts;
