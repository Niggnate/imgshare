import { Models } from "appwrite";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
    useLikePost,
    useSavePost,
    useDeleteSavedPost,
    useGetCurrentUser,
} from "@/lib/react-query/queries";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();
    const likesList = post.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isShared, setIsShared] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    // const savedPostRecord = currentUser?.save.find(
    //     (record: Models.Document) => record.post.$id === post.$id
    // );

    const savedPostRecord = currentUser?.share.find(
        (record: Models.Document) => record.post.$id === post.$id
    )

    useEffect(() => {
        setIsShared(!!savedPostRecord);
    }, [currentUser]);

    const handleLikePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray });
    };

    const handleSharePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsShared(false);
            return deleteSavePost(savedPostRecord.$id);
        }

        savePost({ userId: userId, postId: post.$id });
        setIsShared(true);
    };

    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";

    return (
        <div
            className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${
                        checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg"
                    }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={isShared ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSharePost(e)}
                />
                <p className="small-medium lg:base-medium">{savePost.length}</p>
            </div>
        </div>
    );
};

export default PostStats;