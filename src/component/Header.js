import React from "react";
import Connection from "./Connection";
import Register from "./Register";
import { Link } from "react-router-dom";
import usePostCount from "../hooks/usePostCount";
import { useConnection } from "../context/connection";
import useBalance from "../hooks/useBalance";
import { shortenAccount } from "../utils";

const Header = () => {
    const { account } = useConnection();
    const ethBalance = useBalance(account);

    const postCount = usePostCount();

    const handleDisconnect = () => {
        return;
    }

    return (
        <section className={"sticky top-0 z-10"}>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    All Posts
                                    <span className="badge badge-sm">{postCount}</span>
                                </Link>
                            </li>
                            {/* <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li> */}
                            <li>
                                <Link to="/create" className={"btn-ghost"}>
                                    Write Post
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case font-bold text-3xl">Blot</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal menu-md px-1">
                        <li>
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                All Posts
                                <span className="badge badge-sm">{postCount}</span>
                            </Link>
                        </li>
                        {/* <li tabIndex={0}>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                        <li>
                            <Link to="/me/posts">
                                My Posts
                                <span className="badge badge-sm">{postCount}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/create" className={"btn-ghost"}>
                                Write Post
                            </Link>
                        </li>
                        <li className={"mx-1"}>
                            {/* <input type="text" placeholder="Search" className="input input-ghost w-24 md:w-auto" /> */}
                            <button className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            {/* <input type="text" placeholder="Search" className="input input-bordered input-md w-full max-w-xs" /> */}
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    {/* <a className="btn">Button</a> */}
                    <div className="flex flex-none gap-2">
                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />

                            {/* sun icon */}
                            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            {/* moon icon */}
                            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                        <Register />
                        {/* <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        </div> */}
                        <Connection />
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                                    <svg viewBox="0 0 108 108" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="128" height="128"><mask id=":rj5:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:rj5:)"><rect width="36" height="36" fill="#c6c085"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-4 8) rotate(168 18 18) scale(1)" fill="#f76157" rx="36"></rect><g transform="translate(0 4) rotate(-8 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                {
                                    account
                                    && <li className={""}>
                                        <div className="justify-between p-4 font-bold">
                                            Account:
                                            <span>{shortenAccount(account)}</span>
                                        </div>
                                    </li>
                                }
                                <li className={""}>
                                    <div className="justify-between p-4 font-bold">
                                        Balance:
                                        <span>{`${Number(ethBalance).toFixed(2)}ETH`}</span>
                                    </div>
                                </li>
                                <div className="divider"></div>
                                <li className={""}>
                                    <Link to="/me/profile" className="justify-between p-4">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <button
                                        type={"button"}
                                        onClick={() => handleDisconnect}
                                        className={"p-4 text-red-600 font-bold"}
                                    >
                                        Disconnect
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">daisyUI</Link>
                </div>
                <div className="flex-none gap-2">
                    <Register />
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div> */}
            {/* <header className="flex justify-between items-center py-2 px-8">
                <span className="font-black text-xl">$CrowdFund</span>
                <Connection />
            </header> */}
        </section>
    );
};

export default Header;
