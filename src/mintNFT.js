var Client = new AElf.Client.AElfClient("http://node:port");
var status = Client.GetChainStatusAsync().GetAwaiter().GetResult();
var height = status.BestChainHeight;
var blockHash = status.BestChainHash;

// Construct the Create parameter of the Token contract
var createInput = new AElf.Contracts.MultiToken.CreateInput()
{
    Symbol = "TRUSTCHAINSUPPLYCHAIN-7",
    TokenName = "BakedBeans",
    TotalSupply = 1,
    Decimals = 0,
    Issuer = Address.FromBase58("ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW"),
    IsBurnable = false,
    LockWhiteList = {  },
    IssueChainId = 'tDVW',
};

// Construct the ForwardCall parameter of the ProxyAccount contract
var forwardCallParam = new AElf.Contracts.ProxyAccountContract.ForwardCallInput()
{
    ProxyAccountHash = Hash.LoadFromHex("ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW"),
    ContractAddress = Address.FromBase58("ELF_ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx_tDVW"),
    MethodName = "Create",
    Args = createInput.ToByteString()
};

// Construct the ManagerForwardCall parameter of the CA contract
var managerForwardCallParam = new Portkey.Contracts.CA.ManagerForwardCallInput()
{
    CaHash = Hash.LoadFromHex(CA_HASH),
    ContractAddress = Address.FromBase58(AGENT_INTERFACE_CONTRACT_ADDRESS),
    MethodName = "ForwardCall",
    Args = forwardCallParam.ToByteString()
};

// Construct transaction
var transaction = new AElf.Types.Transaction()
{
    From = Address.FromBase58(YOUR_CA_MANAGER_ADDRESS),
    To = Address.FromBase58(PORTKEY_CA_CONTRACT_ADDRESS),
    MethodName = "ManagerForwardCall",
    Params = managerForwardCallParam.ToByteString(),
    RefBlockNumber = height,
    RefBlockPrefix = ByteString.CopyFrom(Hash.LoadFromHex(blockHash).Value.Take(4).ToArray()),
};

// Sign
var transactionId = HashHelper.ComputeFrom(transaction.ToByteArray());        
var signature = CryptoHelper.SignWithPrivateKey(ByteArrayHelper.HexStringToByteArray(PRIVATE_KEY), transactionId.ToByteArray());

// Send transaction
await Client.SendRawTransactionAsync(new AElf.Client.Dto.SendRawTransactionInput()
{
    Transaction = transaction.ToByteArray().ToHex(),
    Signature = signature.ToHex(),
    ReturnTransaction = true
});