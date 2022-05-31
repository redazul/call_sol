import React, { Component } from 'react';
import "./App.css"
import * as web3 from '@solana/web3.js';



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
  programID:"cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
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


  console.log("hello")

  const resp = await window.solana.connect();
  resp.publicKey.toString()
  console.log(resp.publicKey.toString())
  // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 

if(resp==null){
  return 0
}

let inspectKeyPair = new web3.Keypair()
console.log(inspectKeyPair.publicKey)
console.log(resp.publicKey)

let airDrop = await connection.requestAirdrop(resp.publicKey, 2e9);
console.log(airDrop)

transaction.feePayer =  new web3.PublicKey(resp.publicKey.toString())
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

let incrIx = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: new web3.PublicKey(resp.publicKey.toString()),
      isSigner: false,
      isWritable: true,
    }
  ],
  programId: this.state.programID,
  data: buffer,
});
/*
  TransactionInstruction({
    keys: Array<AccountMeta>,
    programId: PublicKey,
    data: Buffer,
  });
*/
transaction.add(incrIx);




//transaction = await window.solana.signTransaction(transaction);

console.log(connection)
console.log(transaction)

const { signature } = await window.solana.signAndSendTransaction(transaction);
console.log(signature)
// await connection.confirmTransaction(signature);





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
