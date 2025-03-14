import { formatEther } from "viem";
import { useClient } from "~~/hooks/scaffold-alchemy/useClient";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-alchemy";
import type { Campaign } from "~~/components/crowdfund/types";

type CampaignCardProps = {
  campaign: Campaign;
  index: number;
  onDonate: () => void;
};

export const CampaignCard = ({ campaign, index, onDonate }: CampaignCardProps) => {
  const { address } = useClient();
  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "Crowdfund" });

  const isOwner = address && address.toLowerCase() === campaign.owner.toLowerCase();
  const isActive = new Date(Number(campaign.deadline) * 1000) > new Date();
  const percentageReached = campaign.target > 0 
    ? (Number(campaign.amountCollected) / Number(campaign.target)) * 100 
    : 0;

  const daysLeft = () => {
    const deadline = new Date(Number(campaign.deadline) * 1000);
    const now = new Date();
    const difference = deadline.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days > 0 ? days : 0;
  };

  const handleDonate = async () => {
    onDonate();
  };

  const handleClaimFunds = async () => {
    try {
      await writeContractAsync({
        functionName: "claimFunds",
        args: [BigInt(index)],
      });
    } catch (error) {
      console.error("Error claiming funds:", error);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {campaign.image && (
        <figure className="h-48 w-full overflow-hidden">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover"
          />
        </figure>
      )}
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold">{campaign.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{campaign.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress:</span>
            <span>{percentageReached.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${Math.min(percentageReached, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="stat-box p-2 bg-base-200 rounded-lg">
            <p className="text-xs text-gray-500">Raised</p>
            <p className="font-semibold">{formatEther(BigInt(campaign.amountCollected))} ETH</p>
          </div>
          <div className="stat-box p-2 bg-base-200 rounded-lg">
            <p className="text-xs text-gray-500">Target</p>
            <p className="font-semibold">{formatEther(BigInt(campaign.target))} ETH</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="badge badge-outline">
            {isActive ? `${daysLeft()} days left` : "Ended"}
          </div>
          {isOwner && !isActive && !campaign.claimed && (
            <button 
              className="btn btn-sm btn-secondary" 
              onClick={handleClaimFunds}
            >
              Claim Funds
            </button>
          )}
        </div>
        
        <div className="card-actions justify-end mt-4">
          <button 
            className="btn btn-primary w-full" 
            onClick={handleDonate}
            disabled={!isActive}
          >
            {isActive ? "Donate" : "Campaign Ended"}
          </button>
        </div>
      </div>
    </div>
  );
};
