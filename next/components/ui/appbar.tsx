import Link from "next/link";
import React from "react";

import { ConnectButton } from '@rainbow-me/rainbowkit';

async function AppBar() {
  return (
    <div className="p-2 bg-gradient-to-b  from-slate-800 to-slate-600 flex gap-6 items-center text-white">

      <Link href={"/clientPage"}>Client Page</Link>
      <Link href={"/serverPage"}>Server Page</Link>
      <Link href={"/middlewareProtected"}>Middleware Protected Page</Link>

      <div className="ml-auto">
        <ConnectButton accountStatus="full" chainStatus="full" showBalance={false} />
      </div>
    </div>
  );
}

export default AppBar;
