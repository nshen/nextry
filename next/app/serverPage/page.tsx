import { auth } from "@/auth";
// import { redirect } from 'next/navigation';

import React from "react";

const page = async () => {
    const session = await auth();
    console.log(session);
    
    if (!session || !session.user) {
        // redirect("/login");
        return <div className="text-red-500 p-5">You Need To Sign In</div>;

    }
    return <div>This is a server Page and must be protected</div>;
};

export default page;
