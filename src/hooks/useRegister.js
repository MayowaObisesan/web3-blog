import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getCrowdfundContract, getInkContract } from "../utils";
import { toast } from "react-toastify";

const useRegister = () => {
    const { isActive, provider } = useConnection();
    const register = useCallback(
        async () => {
            // if (!title || !goal || !duration)
            //     return toast.info("Please provide all valeus");
            if (!isActive) return toast.info("Please, connect to register");
            const contract = await getInkContract(provider, true);
            // const estimatedGas = await contract.register.estimateGas();

            return contract.register();
        },
        [isActive, provider]
    );

    // console.log(register);

    return register;
};

export default useRegister;
