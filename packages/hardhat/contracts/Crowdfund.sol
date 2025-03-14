// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Crowdfund
 * @dev A contract for crowdfunding projects where users can create campaigns and others can contribute
 */
contract Crowdfund {
    // Campaign struct to store campaign details
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donors;
        uint256[] donations;
        bool claimed;
    }

    // Mapping from campaign ID to Campaign struct
    mapping(uint256 => Campaign) public campaigns;
    
    // Number of campaigns created
    uint256 public numberOfCampaigns = 0;

    // Events
    event CampaignCreated(uint256 indexed id, address indexed owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 indexed id, address indexed donor, uint256 amount);
    event FundsClaimed(uint256 indexed id, address indexed owner, uint256 amount);
    event RefundIssued(uint256 indexed id, address indexed donor, uint256 amount);

    /**
     * @dev Creates a new campaign
     * @param _title Title of the campaign
     * @param _description Description of the campaign
     * @param _target Funding target in wei
     * @param _deadline Deadline timestamp for the campaign
     * @param _image IPFS hash or URL of the campaign image
     */
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_target > 0, "Target amount must be greater than 0");
        require(bytes(_title).length > 0, "Title cannot be empty");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.claimed = false;

        emit CampaignCreated(numberOfCampaigns, msg.sender, _title, _target, _deadline);
        
        numberOfCampaigns++;
        
        return numberOfCampaigns - 1;
    }

    /**
     * @dev Donate to a campaign
     * @param _id ID of the campaign
     */
    function donateToCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        require(msg.value > 0, "Donation amount must be greater than 0");
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        
        campaign.donors.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;
        
        emit DonationReceived(_id, msg.sender, msg.value);
    }

    /**
     * @dev Get donors of a campaign
     * @param _id ID of the campaign
     * @return donors Array of donor addresses
     * @return donations Array of donation amounts
     */
    function getDonors(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_id].donors, campaigns[_id].donations);
    }

    /**
     * @dev Get all campaigns
     * @return Array of all campaigns
     */
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        
        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        
        return allCampaigns;
    }

    /**
     * @dev Claim funds from a successful campaign
     * @param _id ID of the campaign
     */
    function claimFunds(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        require(campaign.owner == msg.sender, "Only the campaign owner can claim funds");
        require(block.timestamp > campaign.deadline, "Campaign has not ended yet");
        require(!campaign.claimed, "Funds have already been claimed");
        
        campaign.claimed = true;
        uint256 amountToTransfer = campaign.amountCollected;
        
        (bool sent, ) = payable(campaign.owner).call{value: amountToTransfer}("");
        require(sent, "Failed to send funds");
        
        emit FundsClaimed(_id, campaign.owner, amountToTransfer);
    }

    /**
     * @dev Check if a campaign is active
     * @param _id ID of the campaign
     * @return bool True if campaign is active
     */
    function isCampaignActive(uint256 _id) public view returns (bool) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (block.timestamp < campaigns[_id].deadline);
    }

    /**
     * @dev Check if a campaign has reached its target
     * @param _id ID of the campaign
     * @return bool True if campaign has reached its target
     */
    function hasReachedTarget(uint256 _id) public view returns (bool) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_id].amountCollected >= campaigns[_id].target);
    }
}
