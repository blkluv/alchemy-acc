"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-alchemy";

type DonateModalProps = {
  campaignId: number;
  campaignTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const DonateModal = ({ campaignId, campaignTitle, isOpen, onClose, onSuccess }: DonateModalProps) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "Crowdfund" });

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert ETH to Wei
      const valueInWei = parseEther(amount);

      await writeContractAsync({
        functionName: "donateToCampaign",
        args: [BigInt(campaignId)],
        value: valueInWei,
      });

      setAmount("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error donating to campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box relative p-6 bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        <button 
          className="btn btn-sm btn-circle absolute right-2 top-2" 
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Donate to {campaignTitle}</h3>
        
        <form onSubmit={handleDonate}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Amount (ETH)</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.1"
              step="0.01"
              min="0.01"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="modal-action">
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : "Donate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
