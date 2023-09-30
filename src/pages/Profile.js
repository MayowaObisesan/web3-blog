import { useConnection } from "../context/connection";

const Profile = () => {
    const { account } = useConnection();

    return (
        <section>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="avatar">
                            <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                                <svg viewBox="0 0 60 60" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="320" height="320"><mask id=":rj5:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:rj5:)"><rect width="36" height="36" fill="#c6c085"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-4 8) rotate(168 18 18) scale(1)" fill="#f76157" rx="36"></rect><g transform="translate(0 4) rotate(-8 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <div className="py-4">Your address: <br /> {account}</div>
                        <p className="py-6">Welcome to my Profile</p>
                        <div>You have </div>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;