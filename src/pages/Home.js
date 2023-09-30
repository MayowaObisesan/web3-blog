import React from "react";
import CreateCampaign from "../component/CreateCampaign";
import AllCampaigns from "../component/AllCampaigns";
import Posts from "./AllPosts";
import TopMenu from "../component/TopMenu";
import HomeCarousels from "../component/HomeCarousels";

const Home = () => {
    return (
        <section className={"mt-10"}>
            {/* <TopMenu /> */}
            {/* <CreateCampaign /> */}
            <HomeCarousels />
            <Posts />
            {/* <AllCampaigns /> */}
        </section>
    );
};

export default Home;
