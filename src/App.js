import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as web3 from '@solana/web3.js'
import Buffer from "buffer"

const NETWORK = web3.clusterApiUrl("devnet");
const connection = new web3.Connection(NETWORK,"confirmed");

// import { useWallet, useConnection } from '@solana/wallet-adapter-react';
//   const { publicKey, sendTransaction } = useWallet();
// // build your connection and transaction objects
// let sig = await sendTransaction(transaction, connection);



function App() {
  async function phantomSignIn()
{

  //sign in 
  const provider = window.solana;
  let resp = await provider.connect()
  console.log(resp.publicKey.toString())

  console.log("building transaction");
  let transaction = new web3.Transaction()
  

  
  let programId = "BkTPaYAXJiZkDoSgKj5sPs7CVWEDqX1McrQxzKmsY74M"
  programId = new web3.PublicKey("BkTPaYAXJiZkDoSgKj5sPs7CVWEDqX1McrQxzKmsY74M")

  
  const instruction = new web3.TransactionInstruction({
    keys: [{pubkey: provider.publicKey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.Buffer.alloc(0), // All instructions are hellos
  });

  transaction.add(instruction);
  transaction.recentBlockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  transaction.feePayer = provider.publicKey;


  //phantom sign
  let signed = await provider.signTransaction(transaction);
  console.log("Got signature, submitting transaction");
  let signature = await connection.sendRawTransaction(signed.serialize());
  console.log("Submitted transaction " + signature + ", awaiting confirmation");
  let resp2 = await connection.confirmTransaction(signature);
  console.log(resp2)
  console.log(signed)
  console.log(signature)
  console.log("Transaction " + signature + " confirmed");


  console.log(transaction);
  

}

  const [state,setState] = useState("Sign In");
  return (
    <div className="App" style={{marginTop:200}}>
      
      <button onClick={phantomSignIn}>Build Transaction</button>
    </div>
  );
}

export default App;
