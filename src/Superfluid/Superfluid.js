import { ethers } from "ethers";

//Gets Called As Soon as User is Chosen for the Job
async function createNewFlow(receiver, speed) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const stream = await Framework.create({chainId: Number(chainId),provider: provider});
    const superSigner = stream.createSigner({ signer: signer });
    const daix = await stream.loadSuperToken("fDAIx");
    const createFlowOperation = daix.createFlow({sender: await superSigner.getAddress(),receiver: receiver,speed: speed});
    const result = await createFlowOperation.exec(superSigner);
}
