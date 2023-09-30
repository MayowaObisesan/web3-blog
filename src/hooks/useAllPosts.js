import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getInkContract, getInkContractWithProvider } from "../utils";

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const { provider } = useConnection();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const contract = await getInkContract(provider, false);
                const allPosts = await contract.getPosts(0, 100);
                const validPosts = allPosts.filter(post => post[2] !== "");
                // console.log(validPosts.length);
                setPosts(validPosts);
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        };

        fetchPosts();
    }, [provider]);

    useEffect(() => {
        // Listen for event
        const handleCreatePostEvent = (id, poster, content, timePosted, tips) => {
            setPosts([
                {
                    id: id,
                    poster: poster,
                    content: content,
                    timePosted: Number(timePosted),
                    tips: tips
                },
                ...posts,
            ]);
        };
        const contract = getInkContractWithProvider(provider);
        contract.on("NewPost", handleCreatePostEvent);

        return () => {
            contract.off("NewPost", handleCreatePostEvent);
        };
    }, [posts, provider]);
    return posts;
};

export default usePosts;
