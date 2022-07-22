require("dotenv").config();
const Web3 = require("web3");
const ethers = require("ethers");
const Mnemonic = require("bitcore-mnemonic");
const axios = require("axios");
const ABI = require("./abi.json");

// setting out http provider
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
  )
);

// let code = new Mnemonic(Mnemonic.Words.ENGLISH);
// console.log(code.toString());
// // console.log(code.toHDPrivateKey());

// const mnemonic =code.toString();

// const wallet01 = ethers.Wallet.fromMnemonic(mnemonic);
// const wallet02 = ethers.Wallet.fromMnemonic(
// mnemonic,
//   `m/44'/60'/0'/0/1`
// );

// console.log(` Account01 public key ${wallet01.address} `);
// console.log(`Account01 privateKey:- ${wallet01.privateKey}`);
// console.log(` Account01 public key ${wallet02.address} `);
// console.log(`Account02 privateKey:- ${wallet02.privateKey}`);

let  contract ;
let contractAddress ;
const apikey = process.env.API_KEY;


// getting contract address
 const getContractAddress = async() => {
   const readline = await require('readline').createInterface({
     input: process.stdin,
     output: process.stdout,
   });
   
   await readline.question(`Paste contract address  `, address => {
     contractAddress = address;
     console.log(contractAddress);
     getContractMethods();
     readline.close();
   });
 }

 getContractAddress();



// getting contract Abi

let contractAbi ;


const getContractMethods = () => {
  const request =
    `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apikey}`;
  axios
    .get(request)
    .then(function (response) {
      contractAbi = JSON.parse(response.data.result);
      contract = new web3.eth.Contract(
        contractAbi,
        contractAddress
      );
  
   nftBalance(account.address);
  
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
}

// const bscProvider = 'https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5';
// const polygonProvider =`https://polygon-mumbai.g.alchemy.com/v2/204b21ciaxTfVIaTj-2UqvYJse58eCNl`;
// const web3 = new Web3(
//   new Web3.providers.HttpProvider(polygonProvider)
// );

// Setting up the contract using its ABI and address

// adding account using private key
const account = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
// web3.eth.defaultAccount = account.address;

// const acc2 = "0xf8a632F5E536CAA2e5176e419309A08AbD87A5EF";

// console.log(web3.eth.defaultAccount);
// console.log(account);

// Calling contract methods

//getting max supply
// const maxSupply = async () => {
//   const supply = await contract.methods.maxSupply().call();
//   console.log(supply);
// };

// maxSupply();

// minting a NFT

// const mint = async () => {
//   const tsx = await contract.methods
//     .mint(1)
//     .send({ from: account.address, gas: 5000000, gasPrice: 40000000000 });
//   console.log(tsx);
// };

// mint();

// Cheacking NFTbalance of account

const nftBalance = async (acc) => {
  const balance = await contract.methods.balanceOf(acc).call();
  console.log(`The ${acc} has ${balance} NFT`);
};

// nftBalance(account.address);

// Transfering the NFT
// const transferNFT = async () => {
//   console.log("Transfering NFT ...");
//   const tsx = await contract.methods
//     .safeTransferFrom(account.address, acc2, 1)
//     .send({ from: account.address, gas: 5000000, gasPrice: 40000000000 });
//   console.log(tsx);
// };

// transferNFT();
// nftBalance(acc2);

// Get Eth balance of account

// const getEthBalance = async (acc) => {
//   const balance = await web3.eth.getBalance(acc);
//   console.log(
//     `The balance of ${acc} is ${web3.utils.fromWei(balance, "ether")} Eth.`
//   );
// };

// Creating new account address
//  console.log(web3.eth.accounts.create());

// Sending eth to other accounts
// const sendEth = async () => {
//   const tsx = await web3.eth.sendTransaction({
//     from: account,
//     to: acc2,
//     value: web3.utils.toWei("0.1", "ether"),
//     gas: 50000,
//   });
  //getEthBalance(account.address);
  //getEthBalance(acc2);
//};

//  getEthBalance(account.address);
// getEthBalance(acc2);

// sendEth();


