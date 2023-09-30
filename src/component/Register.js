import { toast } from "react-toastify";
import { useConnection } from "../context/connection";
import useProposeCampaign from "../hooks/useProposeCampaign";
import { useState } from "react";
import useRegister from "../hooks/useRegister";

const Register = () => {
    const [sendingTx, setSendingTx] = useState(false);
    const { connect, isActive, account, switchToChain } = useConnection();
    const register = useRegister();


    const handleRegister = async () => {
        console.log("Inside handle register");
        if (!isActive) return toast.info("Please connect to register");

        try {
            setSendingTx(true);
            const tx = await register();
            const receipt = await tx.wait();
            if (receipt.status === 0) return toast.error("Tx failed");
            toast.success("Registered successfully");
        } catch (err) {
            console.log("Error registering: ", err);
            if (err.info.error.code === 4001) {
                return toast.error("You rejected the request");
            }
            toast.error("Check that you connected your wallet");
        } finally {
            setSendingTx(false);
        }
    }

    return (
        <section>
            <button
                type={"button"}
                className={"btn btn-success"}
                onClick={handleRegister}
            >
                Register
            </button>
        </section>
    )
}

export default Register;