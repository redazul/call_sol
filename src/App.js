import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as web3 from '@solana/web3.js'
import Buffer from "buffer"
import borsh from "borsh"

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
  
  let publicKey = new web3.PublicKey(resp.publicKey.toString())
  
  let programId = "BkTPaYAXJiZkDoSgKj5sPs7CVWEDqX1McrQxzKmsY74M"
  programId = new web3.PublicKey("BkTPaYAXJiZkDoSgKj5sPs7CVWEDqX1McrQxzKmsY74M")

  const GREETING_SEED = 'hello';
  let greetedPubkey = await web3.PublicKey.createWithSeed(
    publicKey,
    GREETING_SEED,
    programId,
  );

  
  const instruction = new web3.TransactionInstruction({
    keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
    programId:programId,
    data: Buffer.Buffer.alloc(0), // All instructions are hellos
  });

  transaction.recentBlockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  transaction.feePayer = provider.publicKey;


  //phantom sign
  //let signed = await provider.signTransaction(transaction);

 

  // Check if the greeting account has already been created
  const greetedAccount = await connection.getAccountInfo(greetedPubkey);
  if (greetedAccount === null) {
    console.log(
      'Creating account',
      greetedPubkey.toBase58(),
      'to say hello to',
    );
    const lamports = await connection.getMinimumBalanceForRentExemption(
      4,
    );

    transaction.add(
      web3.SystemProgram.createAccountWithSeed({
        fromPubkey: publicKey,
        basePubkey: publicKey,
        seed: GREETING_SEED,
        newAccountPubkey: greetedPubkey,
        lamports,
        space: 4,
        programId,
      }),
    );
  }

  transaction.add(instruction)

  //console.log(transaction);

  let options = {
    skipPreflight: true
  }
  let sig = await provider.signAndSendTransaction(transaction, options);




  



  //let resp2 = provider.signAndSendTransaction(transaction);
  // console.log("Got signature, submitting transaction");
  // let signature = await connection.sendRawTransaction(signed.serialize());
  // console.log("Submitted transaction " + signature + ", awaiting confirmation");
  // let resp2 = await connection.confirmTransaction(signature);
  // console.log(resp2)
  // console.log(signed)
  // console.log(signature)
  // console.log("Transaction " + signature + " confirmed");

  console.log(sig);


  console.log(transaction);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://explorer-api.devnet.solana.com', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (xhr.readyState === 4) {
      console.log(JSON.parse(xhr.response).result.meta.logMessages)

      var logMessages = JSON.parse(xhr.response).result.meta.logMessages

      logMessages.forEach(element => {
        console.log(element)
      });

    }
  }


  var postData = {"method":"getConfirmedTransaction","jsonrpc":"2.0","params":["4EZWLMevpqnkiFSqGcDTWZFej2TvP7MZqQbdqjZeLpvcGJZS3JdXkrRx95EiV5z6611atJVpQM4KbB4D5mhiWVEB",{"encoding":"jsonParsed","commitment":"confirmed"}],"id":"1d0868d5-9764-41ae-ba73-a82a288a1178"}

  xhr.send(JSON.stringify(postData));
  

}

  const [state,setState] = useState("Sign In");
  return (
    <div className="App" style={{marginTop:200}}>
      
      <button onClick={phantomSignIn}>Build Transaction</button>
    </div>
  );
}

export default App;
