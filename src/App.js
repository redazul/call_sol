import React, { Component } from 'react';
import "./App.css"
import * as web3 from '@solana/web3.js';

const BN = require("bn.js");

//network setup
const network = "https://api.devnet.solana.com";
const connection = new web3.Connection(network);
let transaction = new web3.Transaction();
const borsh = require("borsh")
window.Buffer = window.Buffer || require('buffer').Buffer;

const escrowProgramID = ""



class App extends Component {


state ={
  //programID:"DgjRULzvv53qVq5jkDTbSHwzXef1tPuZrnVPi37Pa2fN"
  //programID:"cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
  programID:"HTjUUz9vkM57Yop3uajBbteXwU5T5hNZErEzekWRjHJC" //counter program
}


async goCall()
{

  const isPhantomInstalled = window.solana && window.solana.isPhantom

  if(!isPhantomInstalled)
  {
    alert("Install Phatom Wallet")
    window.open("https://phantom.app/", "_blank");
    return 0
  }


  console.log("hello there")

  const resp = await window.solana.connect();
  resp.publicKey.toString()
  console.log(resp.publicKey.toString())
  console.log(resp)
  // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 

if(resp==null){
  return 0
}

//just to look at the result of web3.Keypair()
let inspectKeyPair = new web3.Keypair()
console.log(inspectKeyPair.publicKey)
console.log(resp.publicKey)

try {
  let airDrop = await connection.requestAirdrop(resp.publicKey, 2e9);
  console.log(airDrop)
} catch (error) {
  console.log(error)
}

  



transaction.feePayer =  new web3.PublicKey(resp.publicKey.toString())


console.log(transaction.feePayer)

transaction.lastValidBlockHeight = await connection.getBlockHeight()
let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
console.log("recentBlockhash: ", blockhash);
transaction.recentBlockhash = blockhash;



// function Test(x) {
//   this.x = x;
// }


// // const value = new Test({ x: 255, y: 20, z: '123', q: [1, 2, 3] });
// // console.log(value)
// // const schema = new Map([[Test, { kind: 'struct', fields: [['x', 'u8'], ['y', 'u64'], ['z', 'string'], ['q', [3]]] }]]);
// // console.log(schema)
// // console.log(borsh)
// // const buffer = borsh.serialize(schema, value);
// // console.log(buffer)


const buffer= Buffer.from(new Uint8Array([0]));


// create account 
console.log("Generating new counter address");
const counter = new web3.Keypair();

console.log(counter)
let counterKey = counter.publicKey;
console.log(counterKey)

console.log(new web3.PublicKey(resp.publicKey.toString()))

let feePayer_pubkey = new web3.PublicKey(resp.publicKey.toString())
console.log("check inputs")
console.log(feePayer_pubkey)
console.log(counterKey)
console.log(this.state.programID)
console.log(this.state)

let createIx = web3.SystemProgram.createAccount({
  fromPubkey: feePayer_pubkey ,
  newAccountPubkey: counterKey,
  /** Amount of lamports to transfer to the created account */
  lamports: await connection.getMinimumBalanceForRentExemption(8),
  /** Amount of space in bytes to allocate to the created account */
  space: 8,
  /** Public key of the program to assign as the owner of the created account */
  programId: new web3.PublicKey(this.state.programID),
});

transaction.add(createIx);

// let incrIx = new web3.TransactionInstruction({
//   keys: [
//     {
//       pubkey: new web3.PublicKey(resp.publicKey.toString()),
//       isSigner: false,
//       isWritable: true,
//     }
//   ],
//   programId: this.state.programID,
//   data: buffer,
// });
// /*
//   TransactionInstruction({
//     keys: Array<AccountMeta>,
//     programId: PublicKey,
//     data: Buffer,
//   });
// */
// transaction.add(incrIx);




transaction = await window.solana.signTransaction(transaction);

console.log(connection)
console.log(transaction)

transaction.signatures[1].signature = counter._keypair.secretKey
console.log(transaction)

// const { signature } = await window.solana.signAndSendTransaction(transaction);
// console.log(signature)
// await connection.confirmTransaction(signature);

const signature = await connection.sendRawTransaction(transaction.serialize());



// const { signature } = await window.solana.signAndSendTransaction(transaction);
// await connection.confirmTransaction(signature);


}

  render() {
    return (
      <div style={{marginTop:window.screen.availHeight/3}} className='center'>
        <button onClick={this.goCall.bind(this)} className='glow'>Call</button>
      </div>
    );
  }
}

export default App;
