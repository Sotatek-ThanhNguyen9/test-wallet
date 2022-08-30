import React, { useCallback, useEffect, useState } from "react";
import { ethers, providers } from "ethers";

const MetaConnect = () => {
    const [address, setAddress] = useState<string>("");
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
    const [balance, setBalance] = useState<ethers.BigNumber>();
    const [signTx, setSignTx] = useState<string>("");
    const [signMessageTx, setSignMessageTx] = useState<string>("");
    const [sendTx, setSendTx] = useState<string>("");
    const [signTypedDataResult, setSignTypeDataResult] = useState<string>("");

    const handleConnect = useCallback(async () => {
        const web3Provider = new providers.Web3Provider(
            (window as any).ethereum
        );
        setProvider(web3Provider);
        await web3Provider.send("eth_requestAccounts", []);
        const web3Signer = web3Provider.getSigner();
        setSigner(web3Signer);
        const web3Address = await web3Signer.getAddress();
        setAddress(web3Address);
    }, []);

    const handleSignTransaction = useCallback(async () => {
        let privatekey =
            "CE75F1A875F2DB7FB064F5DBD302B0C77FFEAA18CC4C314167A5111A04F79AFA";
        let wallet = new ethers.Wallet(privatekey);

        let transaction = {
            to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
            value: ethers.utils.parseEther("1"),
            gasLimit: "21000",
            maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
            maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
            nonce: 1,
            type: 2,
            chainId: 4,
        };

        // sign and serialize the transaction
        let rawTransaction = await wallet
            .signTransaction(transaction)
            .then(() => ethers.utils.serializeTransaction(transaction));

        setSignTx(rawTransaction);
    }, []);

    const handleSendTransation = useCallback(async () => {
        if (!signer) return;

        const tx = await signer.sendTransaction({
            to: "0x3c407a745bD2A27F11E35B58658b62561b6544d4",
            chainId: 4,
            from: address,
            value: ethers.utils.parseEther("0.001"),
        });
        setSendTx(tx.hash);
    }, [address, signer]);

    const handleSignMessage = useCallback(async () => {
        if (!signer) return;

        const tx = await signer.signMessage("message");

        setSignMessageTx(tx);
    }, [signer]);

    const handleSignTypeData = useCallback(async () => {
        if (!signer) return;
        const domain = {
            name: "Ether Mail",
            version: "2.0",
            chainId: 4,
            verifyingContract: "0x49ea470215EAe737334cE4EA112c1b29A9563E1B",
        };

        const types = {
            Person: [
                { name: "name", type: "string" },
                { name: "wallet", type: "address" },
            ],
            Mail: [
                { name: "from", type: "Person" },
                { name: "to", type: "Person" },
                { name: "contents", type: "string" },
            ],
        };

        const value = {
            from: {
                name: "Cow",
                wallet: address,
            },
            to: {
                name: "Bob",
                wallet: "0x3c407a745bD2A27F11E35B58658b62561b6544d4",
            },
            contents: "Hello, Bob!",
        };

        const signature = await signer._signTypedData(domain, types, value);

        setSignTypeDataResult(signature);
    }, [signer, address]);

    const shorttenAddress = useCallback((str: string) => {
        if (str.length === 0) return;
        return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
    }, []);

    useEffect(() => {
        if (!provider) return;

        const getBalance = async (address: string) => {
            const balance = await provider.getBalance(address);
            setBalance(balance);
        };
        getBalance(address);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return (
        <div className="grid place-content-center h-[100vh]">
            <div className="max-w-[100vw] flex flex-col justify-center items-center">
                {address && (
                    <div>
                        <p>Address: {shorttenAddress(address)}</p>
                        <p>
                            Balance:{" "}
                            {balance &&
                                ethers.utils.formatEther(balance).toString()}
                        </p>
                        {/* <p>
                            Sign Message tx hash:{" "}
                            {shorttenAddress(signMessageTx)}
                        </p>
                        <p>Sign tx hash: {shorttenAddress(signTx)}</p> */}
                        <p>
                            Send tx hash:{" "}
                            <a
                                href={`https://rinkeby.etherscan.io/tx/${sendTx}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {shorttenAddress(sendTx)}
                            </a>
                        </p>
                        {/* <p>
                            Sign Type Data result:{" "}
                            {shorttenAddress(signTypedDataResult)}
                        </p> */}
                    </div>
                )}
                <div className="mt-4 grid sm:grid-cols-1 xs:grid-cols-1 gap-4 w-80">
                    {!address && (
                        <button
                            className="btn btn-primary w-full"
                            onClick={handleConnect}
                        >
                            Connect Wallet
                        </button>
                    )}
                    <button
                        onClick={handleSignMessage}
                        className="btn btn-primary"
                        type="button"
                    >
                        Sign Message
                    </button>
                    {/* <button
                        onClick={handleSignTransaction}
                        className="btn btn-primary"
                        type="button"
                    >
                        Sign Transaction
                    </button> */}
                    <button
                        onClick={handleSendTransation}
                        className="btn btn-primary"
                        type="button"
                    >
                        Send Transaction
                    </button>
                    <button
                        onClick={handleSignTypeData}
                        className="btn btn-primary"
                        type="button"
                    >
                        Sign Type Data
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MetaConnect;
