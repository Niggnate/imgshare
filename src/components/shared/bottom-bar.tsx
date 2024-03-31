import {Link, useLocation} from "react-router-dom";
import {bottombarLinks} from "@/constants";
import {INavLink} from "@/types";

const BottomBar = () => {
    const { pathname } = useLocation()

    return (
        <section className={"bottom-bar"}>
            {bottombarLinks.map((link: INavLink) => {
                const isActive = pathname === link.route
                return (
                    <Link
                        key={link.label}
                        to={link.route}
                        className={`${isActive && 'bg-primary-local rounded-[10px]'} flex-col flex-center gap-1 p-2 transition`}
                    >
                        <img
                            src={link.imgURL}
                            alt={link.label}
                            className={`${isActive && 'invert-white'}`}
                            width={20}
                            height={20}
                        />
                        <p className={`tiny-medium ${isActive && 'invert-white'}`}>
                            {link.label}
                        </p>
                    </Link>
                )
            })}
        </section>
    )
}

export default BottomBar