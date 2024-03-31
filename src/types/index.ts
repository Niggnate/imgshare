import React from "react";

export type IContextType = {
    user: IUser
    isLoading: boolean
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    checkAuthenticatedUser: () => Promise<boolean>
}

export type IPositionType = {
    user: IUser
}

type IFollowPerson = {
    follower?: string;
    following?: string;
}

type IPerson = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
};


export type IUser = IPerson & IFollowPerson

export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
};