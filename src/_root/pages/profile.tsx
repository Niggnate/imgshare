import {
    Link,
    useParams,
    useLocation,
} from "react-router-dom";


import { LikedPosts } from "@/_root/pages";
import { useGetUserById } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import {useUserContext} from "@/context/auth-context.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

interface StabBlockProps {
    value: string | number;
    label: string;
}

type TabButtonTypes = "posts" | "likedPosts"
const StatBlock = ({ value, label }: StabBlockProps) => (
    <div className="flex-center gap-2 bg-light-2 rounded-xl py-2 px-4">
        <p className="small-semibold lg:body-bold text-primary-4">{value}</p>
        <p className="small-medium lg:base-medium text-dark-2">{label}</p>
    </div>
);

const Profile = () => {
    const { id } = useParams();
    const { user } = useUserContext();
    const { pathname } = useLocation();

    const [tabAction, setTabAction] = useState<TabButtonTypes>("posts")

    const { data: currentUser } = useGetUserById(id || "");

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
                    <img
                        src={
                            currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
                        }
                        alt="profile"
                        className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
                    />
                    <div className="flex flex-col flex-1 justify-between md:mt-2">
                        <div className="flex flex-col w-full">
                            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                                {currentUser.name}
                            </h1>
                            <p className="small-regular md:body-medium text-primary-4 text-center xl:text-left">
                                @{currentUser.username}
                            </p>
                        </div>

                        <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                            <StatBlock value={currentUser.posts.length} label="Posts" />
                            <StatBlock value={20} label="Followers" />
                            <StatBlock value={20} label="Following" />
                        </div>

                        <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                            {currentUser.bio}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <div className={`${user.id !== currentUser.$id && "hidden"}`}>
                            <Link
                                to={`/update-profile/${currentUser.$id}`}
                                className={`h-12 bg-light-2 px-5 text-dark-1 flex-center gap-2 rounded-lg ${
                                    user.id !== currentUser.$id && "hidden"
                                }`}>
                                <img
                                    src={"/assets/icons/edit.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                                <p className="flex whitespace-nowrap small-medium">
                                    Edit Profile
                                </p>
                            </Link>
                        </div>
                        <div className={`${user.id === id && "hidden"}`}>
                            <Button type="button" className="shad-button_primary px-8">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {currentUser.$id === user.id ? (
                <div className="flex max-w-5xl w-full">
                    <Button className={`profile-tab rounded-l-lg ${
                        pathname === `/profile/${id}` && "!bg-light-2 w-9/12"
                    }`} onClick={() => setTabAction("posts")}>
                        <img
                            src={"/assets/icons/posts.svg"}
                            alt="posts"
                            width={20}
                            height={20}
                        />

                        Posts

                    </Button>

                    <Button className={`profile-tab p-3 ml-4 rounded-l-lg ${
                        pathname === `/profile/${id}` && "!bg-light-2 py-10"
                    }`} onClick={() => setTabAction("likedPosts")}>
                        <img
                            src={"/assets/icons/like.svg"}
                            alt="posts"
                            width={20}
                            height={20}
                        />
                        Liked Posts

                    </Button>
                </div>
            ) : (
                <div className="flex max-w-5xl w-full">
                    <Button className={`profile-tab rounded-l-lg ${
                        pathname === `/profile/${id}` && "!bg-light-2 w-9/12"
                    }`} onClick={() => setTabAction("posts")}>
                        <img
                            src={"/assets/icons/posts.svg"}
                            alt="posts"
                            width={20}
                            height={20}
                        />

                        Posts

                    </Button>

                    <Button className={`profile-tab p-3 ml-4 rounded-l-lg ${
                        pathname === `/profile/${id}` && "!bg-light-2 py-10"
                    }`} onClick={() => setTabAction("likedPosts")}>
                        <img
                            src={"/assets/icons/like.svg"}
                            alt="posts"
                            width={20}
                            height={20}
                        />
                        Liked Posts

                    </Button>
                </div>
            )}

            {tabAction === "posts" ? (
                <GridPostList posts={currentUser.posts} showUser={false} />
            ) : (
                <LikedPosts id={id} />
            )}

            {/*<Routes>*/}
            {/*    <Route*/}
            {/*        index*/}
            {/*        element={<GridPostList posts={currentUser.posts} showUser={false} />}*/}
            {/*    />*/}
            {/*    {currentUser.$id === user.id && (*/}
            {/*        <Route path="/liked-posts" element={<LikedPosts />} />*/}
            {/*    )}*/}
            {/*</Routes>*/}
            {/*<Outlet />*/}
        </div>
    );
};

export default Profile;