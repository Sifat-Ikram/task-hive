"use client";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [observer, setObserver] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(true);
                setObserver(user);

            } else {
                setIsLogin(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    console.log(observer);


    const logOut = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return (
        <header className="bg-[#04734C] shadow">
            <nav className="w-4/5 mx-auto flex justify-between items-center py-3">
                <div>
                    <Link href={HOME_ROUTE}><h1 className="text-4xl font-semibold text-white">TaskHive</h1></Link>
                </div>
                <ul className="flex justify-center items-center gap-2">
                    {!isLogin &&
                        <>
                            <Link href={REGISTER_ROUTE}><li className="text-white font-medium px-2">Register</li></Link>
                            <Link href={LOGIN_ROUTE}><li className="text-white font-medium px-2">LogIn</li></Link>
                        </>
                    }
                    {isLogin &&
                        <>
                            <li onClick={() => logOut()} className="text-white font-medium px-2">LogOut</li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;