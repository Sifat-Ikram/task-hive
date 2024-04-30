import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "next/link";

const Header = () => {
    const isLogin = false;
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
                        <Avatar icon={<UserOutlined />} className="text-white"></Avatar>
                        <Link href={HOME_ROUTE}><h1 className="text-white text-lg font-medium">Sifat</h1></Link>
                    </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;