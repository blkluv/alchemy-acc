"use client";

import { useState } from "react";
import { useAuthModal } from "@account-kit/react";
import { CreateCampaignForm } from "./CreateCampaignForm";
import { CampaignList } from "./CampaignList";
import { useClient } from "~~/hooks/scaffold-alchemy/useClient";

export const CrowdfundApp = () => {
  const { address } = useClient();
  const { openAuthModal } = useAuthModal();
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const isConnected = !!address;

  const handleCreateSuccess = () => {
    setActiveTab("browse");
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Crowdfund dApp</h1>
        <p className="text-xl text-gray-600">Support projects you believe in with ETH</p>
      </div>

      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-2xl font-bold justify-center mb-4">Connect Your Wallet</h2>
              <p className="mb-6">Please connect your wallet to browse campaigns or create your own.</p>
              <button className="btn btn-primary" onClick={openAuthModal}>
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="tabs tabs-boxed justify-center mb-8">
            <a 
              className={`tab ${activeTab === "browse" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("browse")}
            >
              Browse Campaigns
            </a>
            <a 
              className={`tab ${activeTab === "create" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("create")}
            >
              Create Campaign
            </a>
          </div>

          {activeTab === "browse" ? (
            <CampaignList key={refreshTrigger} />
          ) : (
            <CreateCampaignForm onSuccess={handleCreateSuccess} />
          )}
        </div>
      )}
    </div>
  );
};
