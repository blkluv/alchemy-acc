"use client";

import { useEffect, useState } from "react";
import { useScaffoldReadContract, useScaffoldContract } from "~~/hooks/scaffold-alchemy";
import type { Campaign } from "~~/components/crowdfund/types";
import { CampaignCard } from "./CampaignCard";
import { DonateModal } from "./DonateModal";

// Update the tuple type to match what the contract actually returns
type CampaignTuple = readonly [
  string,   // owner
  string,   // title
  string,   // description
  bigint,   // target
  bigint,   // deadline
  bigint,   // amountCollected
  string,   // image
  boolean    // claimed
];

export const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<{id: number, title: string} | null>(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the contract instance
  const { data: crowdfundContract } = useScaffoldContract({
    contractName: "Crowdfund",
  });

  // Get the number of campaigns first
  const { data: numberOfCampaigns } = useScaffoldReadContract({
    contractName: "Crowdfund",
    functionName: "numberOfCampaigns",
  });

  // Use a single useEffect to fetch all campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!numberOfCampaigns || !crowdfundContract) {
        setCampaigns([]);
        setIsLoading(false);
        return;
      }

      try {
        const totalCampaigns = Number(numberOfCampaigns);
        console.log("Total campaigns:", totalCampaigns);
        
        if (totalCampaigns === 0) {
          setCampaigns([]);
          setIsLoading(false);
          return;
        }

        const campaignsArray: Campaign[] = [];

        // Fetch each campaign one by one
        for (let i = 0; i < totalCampaigns; i++) {
          try {
            // Get campaign data
            const campaignData = await crowdfundContract.read.campaigns([BigInt(i)]);

            if (!campaignData) continue;

            // Destructure the campaign data tuple
            const [owner, title, description, target, deadline, amountCollected, image, claimed] = 
              campaignData as CampaignTuple;
            
            // Get donors and donations
            const donorData = await crowdfundContract.read.getDonors([BigInt(i)]);
            
            const donors = donorData ? donorData[0] as string[] : [];
            const donations = donorData ? donorData[1] as bigint[] : [];
            
            // Create campaign object
            campaignsArray.push({
              owner,
              title,
              description,
              target,
              deadline,
              amountCollected,
              image,
              donors,
              donations,
              claimed
            });
          } catch (err) {
            console.error(`Error fetching campaign ${i}:`, err);
          }
        }

        setCampaigns(campaignsArray);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Error fetching campaigns");
      } finally {
        setIsLoading(false);
      }
    };

    if (numberOfCampaigns !== undefined && crowdfundContract) {
      console.log("Number of campaigns:", numberOfCampaigns.toString());
      fetchCampaigns();
    }
  }, [numberOfCampaigns, crowdfundContract]);

  const handleDonateClick = (index: number, title: string) => {
    setSelectedCampaign({ id: index, title });
    setShowDonateModal(true);
  };

  const handleDonateSuccess = () => {
    // Refetch campaigns
    if (numberOfCampaigns !== undefined) {
      setIsLoading(true);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2 text-error">Error Loading Campaigns</h3>
        <p className="text-gray-500">{error}</p>
        <button 
          className="btn btn-primary mt-4" 
          onClick={() => setIsLoading(true)}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
        <p className="text-gray-500">Be the first to create a campaign!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            campaign={campaign}
            index={index}
            onDonate={() => handleDonateClick(index, campaign.title)}
          />
        ))}
      </div>

      {selectedCampaign && (
        <DonateModal
          campaignId={selectedCampaign.id}
          campaignTitle={selectedCampaign.title}
          isOpen={showDonateModal}
          onClose={() => setShowDonateModal(false)}
          onSuccess={handleDonateSuccess}
        />
      )}
    </div>
  );
};
