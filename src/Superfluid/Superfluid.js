import { ethers } from "ethers";

//Gets Called As Soon as User is Chosen for the Job
async function createNewFlow(recipient, flowRate) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");


    const createFlowOperation = daix.createFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate: flowRate
    });

    const result = await createFlowOperation.exec(superSigner);
}