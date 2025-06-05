"use client";

import type { NextPage } from "next";
import { CrowdfundApp } from "~~/components/crowdfund";

const Home: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow bg-gradient-to-b from-purple-50 to-pink-50">
      <CrowdfundApp />
    </div>
  );
};

export default Home;
