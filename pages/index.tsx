import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
const Tx = require("ethereumjs-tx");

const MetaConnect = () => {
    const [message, setMessage] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
    const [network, setNetwork] = useState<string>("");
    const [accountAddress, setAccountAddress] = useState<string>("");
    const [chainId, setChainId] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [balance, setBalance] = useState<ethers.BigNumber>();
    const [signTx, setSignTx] = useState<string>("");
    const [sendTx, setSendTx] = useState<string>("");

    const handleConnect = useCallback(async () => {
        const prov = new ethers.providers.Web3Provider(
            (window as any).ethereum,
            "any"
        );
        // Prompt user for account connections
        await prov.send("eth_requestAccounts", []);
        const signer = prov.getSigner();
        setProvider(prov);
        setSigner(signer);
        setAddress(await signer.getAddress());
    }, []);

    const handleDisconnect = useCallback(async () => {
        const { ethereum } = window as any;
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts && accounts.length > 0) {
            console.log("user is connected");
        } else {
            console.log("user not connected");
        }
    }, []);

    const handleSign = useCallback(async () => {
        let privatekey =
            "CE75F1A875F2DB7FB064F5DBD302B0C77FFEAA18CC4C314167A5111A04F79AFA";
        let wallet = new ethers.Wallet(privatekey);

        console.log("Using wallet address " + wallet.address);

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

    const handleSend = useCallback(async () => {
        if (
            !signer ||
            accountAddress === "" ||
            chainId === "" ||
            amount === "" ||
            !provider
        )
            return;

        // const params = [
        //     {
        //         from: address,
        //         to: accountAddress,
        //         value: ethers.utils.parseUnits(amount, "ether").toHexString(),
        //     },
        // ];

        // const transactionHash = await provider.send(
        //     "eth_sendTransaction",
        //     params
        // );
        // console.log("transactionHash is " + transactionHash);
        // setSendTx(transactionHash);

        const tx = await signer.sendTransaction({
            to: accountAddress,
            chainId: Number(chainId),
            from: address,
            value: ethers.utils.parseEther(amount),
        });
        setSendTx(tx.hash);
    }, [accountAddress, address, amount, chainId, signer, provider]);

    const handleSignMessage = useCallback(async () => {
        if (!signer) return;

        signer.signMessage(message);
    }, [message, signer]);

    const handleChangeMessage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
        },
        []
    );

    const handleChangeAccountAddress = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setAccountAddress(e.target.value);
        },
        []
    );

    const handleChangeNetwork: React.ReactEventHandler<HTMLSelectElement> =
        useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
            setNetwork(e.target.value);
        }, []);

    const handleChangeChainId = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setChainId(e.target.value);
        },
        []
    );

    const handleChangeAmount = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(e.target.value);
        },
        []
    );

    useEffect(() => {
        const getBalance = async (address: string) => {
            const balance = await provider?.getBalance(address);
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
                    <p>Sign tx hash: {signTx}</p>
                    <p>Send tx hash: {sendTx}</p>
                </div>
            )}
            <form>
                <div className="mt-4 w-96">
                    <label htmlFor="account-name">Message</label>
                    <input
                        value={message}
                        onChange={handleChangeMessage}
                        className="inp"
                        required
                    />
                </div>
                <div className="mt-4 w-96">
                    <button
                        onClick={handleSignMessage}
                        className="btn btn-primary"
                        type="button"
                    >
                        Sign Message
                    </button>
                </div>
            </form>
            <form>
                {/* <div className="mt-4 w-96">
                    <label htmlFor="account-name">Network</label>
                    <select
                        value={network}
                        onChange={handleChangeNetwork}
                        className="inp"
                    >
                        <option value="mainnet01">Mainnet</option>
                        <option value="testnet04">Rinkeby</option>
                    </select>
                </div> */}
                <div className="mt-4 w-96">
                    <label htmlFor="network">Account address</label>
                    <input
                        value={accountAddress}
                        onChange={handleChangeAccountAddress}
                        className="inp"
                        required
                    />
                </div>
                <div className="mt-4 w-96">
                    <label htmlFor="account-name">ChainId</label>
                    <input
                        value={chainId}
                        onChange={handleChangeChainId}
                        className="inp"
                        type="number"
                        required
                    />
                </div>
                <div className="mt-4 w-96">
                    <label htmlFor="account-name">Amount</label>
                    <input
                        value={amount}
                        onChange={handleChangeAmount}
                        className="inp"
                        required
                    />
                </div>
                <div className="mt-4 w-96">
                    <button
                        onClick={handleSign}
                        className="btn btn-primary"
                        type="button"
                    >
                        Sign Transaction
                    </button>
                    <button
                        onClick={handleSend}
                        className="btn btn-secondary ml-4"
                        type="button"
                    >
                        Send Transaction
                    </button>
                </div>
            </form>
        </div>
    );
};
export default MetaConnect;
