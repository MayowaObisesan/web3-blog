const HomeCarousels = () => {
    return (
        <section className="carousel w-full">
            <div className="hero min-h-[600px] bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-5xl">
                        <h1 className="text-8xl font-bold py-4">Decentralized Blog</h1>
                        <p className="py-6 max-w-md mx-auto">
                            The best decentralized Blog Platform in the web3 space.
                            {/* Earn Tips */}
                            {/* Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. */}
                        </p>
                        <div className="flex w-full py-8">
                            <div className="grid flex-grow py-2 rounded-box place-items-center">Own your articles</div>
                            <div className="divider divider-horizontal"></div>
                            <div className="grid flex-grow py-2 rounded-box place-items-center">Built on Blockchain Technology</div>
                            <div className="divider divider-horizontal"></div>
                            <div className="grid flex-grow py-2 rounded-box place-items-center">Earn Tips from readers</div>
                        </div>
                        <button className="btn btn-primary my-6">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCarousels;
