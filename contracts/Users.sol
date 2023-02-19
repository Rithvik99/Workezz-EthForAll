// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Jobs.sol';

contract Users{
    
    struct user{

        string name;
        string email;
        string phoneno;
        string country;
        string linkedin;
        string[] interest;
        bool isTrue;

        //Employee Side
        uint256[] activeGigs;
        uint256[] appliedGigs;
        uint256[] pastGigs;
    }

    mapping(address=>user) public user_id_map;

    //Adding a New User
    function AddUser(string memory name,string memory email, string memory phoneno,string memory country,string memory linkedin,string[] memory interest) public
    {
        // assert(!user_id_map[msg.sender].isTrue);
        user_id_map[msg.sender].name = name;
        user_id_map[msg.sender].email = email;
        user_id_map[msg.sender].phoneno = phoneno;
        user_id_map[msg.sender].country = country;
        user_id_map[msg.sender].linkedin = linkedin;
        user_id_map[msg.sender].interest = interest;
        user_id_map[msg.sender].isTrue = true;
    }

    function ValidateUser() public view returns (bool) {
        return(user_id_map[msg.sender].isTrue);
    }

    function GetUName(address userAdd) public view returns(string memory){
        return(user_id_map[userAdd].name);
    }
    
    function GetEmail(address userAdd) public view returns(string memory){
        return(user_id_map[userAdd].email);
    }

    function GetActiveGigsCount(address userAdd)public view returns(uint256) {
        return(user_id_map[userAdd].pastGigs.length);
    }

    // Get All The Info of The User
    function GetData() public view returns (user memory)
    {
        assert(user_id_map[msg.sender].isTrue);
        return user_id_map[msg.sender];
    }

    //Get Applied Job Info
    function GetAppliedJobs() public view returns (uint256[] memory)
    {
        assert(user_id_map[msg.sender].isTrue);
        return user_id_map[msg.sender].appliedGigs;
    }

    //Get Active Job Info
    function GetActiveJobs() public view returns (uint256[] memory)
    {
        assert(user_id_map[msg.sender].isTrue);
        return user_id_map[msg.sender].activeGigs;
    }

    //Get Past Job Info
    function GetPastJobs() public view returns (uint256[] memory)
    {
        assert(user_id_map[msg.sender].isTrue);
        return user_id_map[msg.sender].pastGigs;
    }

    //Employee Applying For a Job
    function ApplyJob(uint256 gig,address jobaddress) public{
        assert(user_id_map[msg.sender].isTrue);
        user_id_map[msg.sender].appliedGigs.push(gig);
        Jobs(jobaddress).updateonApply(gig);    
    }

        
    //Accepting An Employee For A Gig (Employer side)
    function AcceptJob(uint256 userindex,uint256 jobindex,address jobaddress) public{
        assert(user_id_map[msg.sender].isTrue);
        Jobs(jobaddress).updateonAccept(userindex,jobindex);
    }

    //Employee Job Status Update
    function UpdateJobStatus(uint256 gig,address clientaddress) public{
        assert(user_id_map[tx.origin].isTrue);  

        uint256 length = user_id_map[clientaddress].appliedGigs.length;
        for(uint256 i=0;i<length;i++)
        {
            if(gig == user_id_map[clientaddress].appliedGigs[i])
            {
                user_id_map[clientaddress].activeGigs.push(gig);
                user_id_map[clientaddress].appliedGigs[i] = user_id_map[clientaddress].appliedGigs[length-1];
                user_id_map[clientaddress].appliedGigs.pop();
            }
        }
    }

    //Closing The Gig (Employer side)
    function CloseJob(uint256 jobindex,address jobaddress) public{
        assert(user_id_map[msg.sender].isTrue);
        Jobs(jobaddress).taskDone(jobindex);
    }

    //Finishing The Job on Employee Side
    function CloseJobStatus(uint256 gig,address clientaddress) public{
        assert(user_id_map[tx.origin].isTrue);  

        uint256 length = user_id_map[clientaddress].activeGigs.length;
        for(uint256 i=0;i<length;i++)
        {
            if(gig == user_id_map[clientaddress].activeGigs[i])
            {
                user_id_map[clientaddress].pastGigs.push(gig);
                user_id_map[clientaddress].activeGigs[i] = user_id_map[clientaddress].activeGigs[length-1];
                user_id_map[clientaddress].activeGigs.pop();
            }
        }
    }
}