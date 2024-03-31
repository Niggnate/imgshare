import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";
import {useUserContext} from "@/context/auth-context.tsx";
import {useSignOutAccount} from "@/lib/react-query/queries.ts";

const TopBar = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { mutate: signOut, isSuccess } = useSignOutAccount();

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <p className={"brand-primary h1-bold flex flex-1 justify-center"}>ImgShare</p>
                </Link>

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost"
                        onClick={() => signOut()}
                    >
                        <img
                            src="/assets/icons/logout.svg"
                            alt="Logout"
                        />
                    </Button>

                    <Link
                        to={`/profile/${user.id}`}
                        className="flex-center gap-3"
                    >
                        <img
                            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
                            alt={"profile"}
                            className={"h-8 w-8 rounded-full"}
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TopBar