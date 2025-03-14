"use client";

import type { NextPage } from "next";
import { CrowdfundApp } from "~~/components/crowdfund";

const Home: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow">
      <CrowdfundApp />
    </div>
  );
};

export default Home;
