import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

const MetaConnect = () => {
    const [message, setMessage] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
    const [network, setNetwork] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("");
    const [chainId, setChainId] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [balance, setBalance] = useState<ethers.BigNumber>();

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
        if (!signer || accountName === "" || chainId === "" || amount === "")
            return;

        signer.signTransaction({
            to: accountName,
            chainId: Number(chainId),
            from: address,
            value: ethers.utils.parseEther(amount),
        });
    }, [accountName, address, amount, chainId, signer]);

    const handleSend = useCallback(async () => {
        if (!signer || accountName === "" || chainId === "" || amount === "")
            return;

        signer.sendTransaction({
            to: accountName,
            chainId: Number(chainId),
            from: address,
            value: ethers.utils.parseEther(amount),
        });
    }, [accountName, address, amount, chainId, signer]);

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

    const handleChangeAccountName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setAccountName(e.target.value);
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
                    <label htmlFor="network">Account name</label>
                    <input
                        value={accountName}
                        onChange={handleChangeAccountName}
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
