// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.9.0;
import './Users.sol';

contract Jobs {
    uint public jobCount = 0;

    struct Job {
        string jobpicture;
        string filename;
        address owner;
        string desc;
        string[] cat;
        bool acceptStatus;
        uint256 uinque_address;
        uint256 applicants_count;
        address[] applicants;
        address worker;
        bool render;
        string pay;
        string duration;
        string jobTitle;
    }

    struct dispJob {
        string owner;
        string desc;
        string pay;
        string duration;
        string jobTitle;
    }

    struct appDets{
        string name;
        string email;
        uint256 active;
        string add;
        uint256 index;
    }

    mapping(uint => Job) public jobs_db;

    mapping(address => Job[]) public employee2job;
    mapping(address => uint256[]) public owner2uniq;
    mapping(address => uint256[]) public ownersActive;
    mapping(address => uint256[]) public ownersPosted;
    mapping(address => uint256[]) public ownersPrevious;
    mapping(string => uint256[]) public cat2job;

    function pushD(string memory des, string[] memory ca,string memory jobpic,string memory filename,string memory pay,string memory duration,string memory title) public{
        jobs_db[jobCount].owner = tx.origin;
        jobs_db[jobCount].desc = des;
        jobs_db[jobCount].cat = ca;
        jobs_db[jobCount].acceptStatus = false;
        jobs_db[jobCount].uinque_address = jobCount;
        jobs_db[jobCount].applicants_count = 0;
        jobs_db[jobCount].jobpicture = jobpic;
        jobs_db[jobCount].render = true;
        jobs_db[jobCount].duration = duration;
        jobs_db[jobCount].pay = pay;
        jobs_db[jobCount].jobTitle = title;
        jobs_db[jobCount].filename = filename;

        for(uint256 i=0;i<ca.length;i++){
            cat2job[ca[i]].push(jobCount);
        }
        owner2uniq[tx.origin].push(jobCount);
        jobCount += 1;
    }

    //Credits [Only This function]: Stackoverflow
    function toString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
    function getDet(uint256 k) public view returns (Job memory) {
        return jobs_db[k];
   }

   function updateonApply(uint256 uniq) public {
       jobs_db[uniq].applicants_count = jobs_db[uniq].applicants_count + 1; 
       jobs_db[uniq].applicants.push(tx.origin);
   }

    function updateonAccept(uint256 ind, uint256 uniq) public {
        Users(msg.sender).UpdateJobStatus(uniq,jobs_db[uniq].applicants[ind]);
        jobs_db[uniq].worker = jobs_db[uniq].applicants[ind];
        jobs_db[uniq].acceptStatus = true;
    }

    function getApplicants(uint256 uniq) public view returns(address[] memory){
        return jobs_db[uniq].applicants;
    }

    function getImageInfo(uint256 jobIndex) public view returns(string[] memory){
        string[] memory images = new string[](3);
        images[0] = jobs_db[jobIndex].jobpicture;
        images[1] = toString(jobs_db[jobIndex].owner);
        images[2] = jobs_db[jobIndex].filename;
        return images;
    }
    function taskDone(uint256 uniq) public {
        Users(msg.sender).CloseJobStatus(uniq,jobs_db[uniq].worker);
        jobs_db[uniq].render = false;
    }

    function GetDispJob(uint256 uniq,address con) public view returns(dispJob memory){
        dispJob memory dj;
        dj.owner = Users(con).GetUName(jobs_db[uniq].owner);
        dj.desc = jobs_db[uniq].desc;
        dj.duration = jobs_db[uniq].duration;
        dj.pay = jobs_db[uniq].pay;
        dj.jobTitle = jobs_db[uniq].jobTitle;
        return dj;
    }

    function getApplicationStat(uint256 uniq) public view returns(bool){
        return jobs_db[uniq].acceptStatus;
    }

    function getRenderStat(uint256 uniq) public view returns(bool){
        return jobs_db[uniq].render;
    }

    function getWorkerName(uint256 uniq,address userdb) public view returns(string memory){
        if(jobs_db[uniq].acceptStatus){
            return Users(userdb).GetUName(jobs_db[uniq].worker);
        }
        return '';
    }

    function GetRecommendations(string[] memory interest) public view returns(uint256[] memory){
        uint count = interest.length;
        uint recoms = 0;
        uint256[] memory recs = new uint256[](6);
        for(uint i=0;i<count;i++){
            for(uint j=0;j<cat2job[interest[i]].length;j++){
                if(msg.sender!=jobs_db[cat2job[interest[i]][j]].owner){
                    if(!amIApplicant(msg.sender, cat2job[interest[i]][j])){
                        recs[recoms] =(cat2job[interest[i]][j]);
                        recoms = recoms+1;
                        if(recoms == 6){
                            break;
                        }
                    }
                }
            }
        }
        for(uint i=recoms;i<6;i++){
            recs[i] = 69;
        }
        return recs;
    }

    function getAllJobs() public view returns(uint256[] memory){
        return owner2uniq[msg.sender];
    }

    function getActiveStatus(uint256 uniq) public view returns(bool){
        return jobs_db[uniq].acceptStatus;
    }

    function getRenderStatus(uint256 uniq) public view returns(bool){
        return jobs_db[uniq].render;
    }

    function getOwner(uint256 uniq) public view returns(address){
        return jobs_db[uniq].owner;
    }

    function getInterest(uint256 uniq) public view returns(string[] memory) {
        return jobs_db[uniq].cat;   
    }

    function amIApplicant(address appl,uint256 uniq) public view returns (bool) {
        for(uint256 i=0;i<jobs_db[uniq].applicants.length;i++){
            if(appl == jobs_db[uniq].applicants[i]){
                return true;
            }
        }
        return false;
    }

    function returnAppDetails(uint256 uniq, address usersDb) public view returns (appDets[] memory){
        appDets[] memory rets = new appDets[](jobs_db[uniq].applicants.length);
        for(uint256 i=0;i<jobs_db[uniq].applicants.length;i++){
            rets[i].name = Users(usersDb).GetUName(jobs_db[uniq].applicants[i]);
            rets[i].email = Users(usersDb).GetEmail(jobs_db[uniq].applicants[i]);
            rets[i].add = toString(jobs_db[uniq].applicants[i]);
            rets[i].active = Users(usersDb).GetActiveGigsCount(jobs_db[uniq].applicants[i]);
            rets[i].index = i;
        }
        return rets;

    }

}