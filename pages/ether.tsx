import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
const Tx = require("ethereumjs-tx");
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

const MetaConnect = () => {
    const [address, setAddress] = useState<string>("");
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
    const [wcProvider, setWcProvider] = useState<WalletConnectProvider>();
    const [balance, setBalance] = useState<ethers.BigNumber>();
    const [signTx, setSignTx] = useState<string>("");
    const [signMessageTx, setSignMessageTx] = useState<string>("");
    const [sendTx, setSendTx] = useState<string>("");
    const [signTypedDataResult, setSignTypeDataResult] = useState<string>("");

    const handleConnect = useCallback(async () => {
        const p = new WalletConnectProvider({
            infuraId: "5d272c78c7584bd4b948a6b48070e8be",
            chainId: 4,
        });
        await p.enable();
        setWcProvider(p);

        const web3Provider = new providers.Web3Provider(p);
        setProvider(web3Provider);
        const web3Signer = web3Provider.getSigner();
        setSigner(web3Signer);
        const web3Address = await web3Signer.getAddress();
        setAddress(web3Address);
    }, []);

    const handleDisconnect = useCallback(async () => {
        if (!wcProvider) return;

        wcProvider.disconnect();
    }, [wcProvider]);

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
            {address === "" ? (
                <button className="btn btn-primary" onClick={handleConnect}>
                    Connect Wallet
                </button>
            ) : (
                <button onClick={handleDisconnect}>Disconnect Wallet</button>
            )}
            {address && (
                <div>
                    <p>Address: {address}</p>
                    <p>
                        Balance:{" "}
                        {balance &&
                            ethers.utils.formatEther(balance).toString()}
                    </p>
                    <p>Sign Message tx hash: {signMessageTx}</p>
                    <p>Sign tx hash: {signTx}</p>
                    <p>Send tx hash: {sendTx}</p>
                    <p>Sign Type Data result: {signTypedDataResult}</p>
                </div>
            )}
            <form>
                <div className="mt-4 w-96">
                    <button
                        onClick={handleSignTransaction}
                        className="btn btn-primary"
                        type="button"
                    >
                        Sign Transaction
                    </button>
                    <button
                        onClick={handleSendTransation}
                        className="btn btn-primary ml-4"
                        type="button"
                    >
                        Send Transaction
                    </button>
                    <div className="mt-4 w-96">
                        <button
                            onClick={handleSignMessage}
                            className="btn btn-primary"
                            type="button"
                        >
                            Sign Message
                        </button>
                    </div>
                    <div className="mt-4 w-96">
                        <button
                            onClick={handleSignTypeData}
                            className="btn btn-primary"
                            type="button"
                        >
                            Sign Type Data
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default MetaConnect;
