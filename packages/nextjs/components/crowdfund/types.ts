export type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  donors: string[];
  donations: bigint[];
  claimed: boolean;
};

export type CampaignFormData = {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};
