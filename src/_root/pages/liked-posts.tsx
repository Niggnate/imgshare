import { GridPostList, Loader } from "@/components/shared";
// import { useGetCurrentUser } from "@/lib/react-query/queries";

import {useGetUserById} from "@/lib/react-query/queries.ts";

type LikedPostsProps = {
    id: string | undefined
}

const LikedPosts = ({ id }: LikedPostsProps) => {
    const { data: currentUser } = useGetUserById(id || "");
    // const { data: currentUser } = useGetCurrentUser();

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <>
            {currentUser.liked.length === 0 && (
                <p className="text-light-4">No liked posts</p>
            )}

            <GridPostList posts={currentUser.liked} showStats={false} />
        </>
    );
};

export default LikedPosts;