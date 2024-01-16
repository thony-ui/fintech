import useTokenContract from "../src/useTokenContract";

const SendNFT = ({provider}) => {
    const tokenContract = useTokenContract(provider, "tDVW");
    console.log(tokenContract, "====tokenContract");
    const transfer = async () => await tokenContract.sendTransaction({
        symbol: "ELF",
        to: "ELF_2vhWPHxddWJVb4ukdrZnCzw5mgYVVcc96bwhZT1DhJKL6phKRE_tDVW",
        amount: "10",
        memo: "transfer in demo"
    });
    return (
        <>
            <button onClick={transfer}>Send NFT</button>
        </>
    )
}

export default SendNFT;