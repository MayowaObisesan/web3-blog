import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getInkContract } from "../utils";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { account, provider } = useConnection();

    useEffect(() => {
        const fetchPosts = async () => {
            if (!account) return;
            try {
                const contract = await getInkContract(provider, false);
                const user = Array.from(await contract.getUser(account));
                setUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [account, provider]);
    return { user, loading };
};

export default useUser;
