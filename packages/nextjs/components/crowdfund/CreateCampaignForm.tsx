"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-alchemy";
import type { CampaignFormData } from "~~/components/crowdfund/types";

type CreateCampaignFormProps = {
  onSuccess: () => void;
};

export const CreateCampaignForm = ({ onSuccess }: CreateCampaignFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "Crowdfund" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert deadline to Unix timestamp (seconds)
      const deadlineDate = new Date(formData.deadline);
      const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);

      // Convert target from ETH to Wei
      const targetInWei = parseEther(formData.target);

      await writeContractAsync({
        functionName: "createCampaign",
        args: [
          formData.title,
          formData.description,
          targetInWei,
          BigInt(deadlineTimestamp),
          formData.image,
        ],
      });

      // Reset form and notify parent component
      setFormData({
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Create a Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Campaign Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your campaign"
              className="textarea textarea-bordered w-full h-24"
              required
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Target Amount (ETH)</span>
            </label>
            <input
              type="number"
              name="target"
              value={formData.target}
              onChange={handleChange}
              placeholder="0.1"
              step="0.01"
              min="0.01"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">End Date</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input input-bordered w-full"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Campaign Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="card-actions justify-end mt-6">
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
