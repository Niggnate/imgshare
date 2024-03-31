import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";
import {useUserContext} from "@/context/auth-context.tsx";
import {sidebarLinks} from "@/constants";
import {INavLink} from "@/types";
import {useSignOutAccount} from "@/lib/react-query/queries.ts";

const LeftSideBar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const { user } = useUserContext()

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])
    
    return (
        <nav className={"leftsidebar"}>
            <div className={"flex flex-col gap-11"}>
                <Link to={"/"} className={"flex gap-3 items-center"}>
                    <p className={"brand-primary h1-bold flex flex-1 justify-center"}>ImgShare</p>
                </Link>
                
                <Link to={`/profile/${user.id}`} className={"flex gap-3 items-center"}>
                    <img
                        src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
                        alt={"profile"}
                        className={"w-14 h-14 rounded-full"}
                    />

                    <div className={"flex flex-col"}>
                        <p className={"body-bold"}>
                            {user.name}
                        </p>
                        <p className={"small-regular text-primary-4"}>
                            @{user.username}
                        </p>
                    </div>
                </Link>

                <ul className={"flex flex-col gap-3"}>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-local'}`}>
                                <Link to={link.route} className={"flex gap-4 items-center p-3"}>
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                    />
                                    <span className={`group-hover:invert-white ${isActive && 'invert-white'}`}>
                                        {link.label}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <Button
                variant="ghost"
                className="shad-button_ghost"
                onClick={() => signOut()}
            >
                <img
                    src="/assets/icons/logout.svg"
                    alt="Logout"
                />
                <p className={"small-medium lg:base-medium"}>Sign Out</p>
            </Button>
        </nav>
    )
}

export default LeftSideBar