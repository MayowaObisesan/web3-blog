const Profile = () => {
    return (
        <section>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="avatar">
                            <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Welcome to my Profile</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;