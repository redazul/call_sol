import React, { Component } from 'react';
import BN from "bn.js";
import "./App.css"
import useWallet from '@solana/wallet-adapter-react';
import { transcode } from 'buffer';
import { serialize,deserialize } from "borsh";
import { createMint,getMint,getOrCreateAssociatedTokenAccount,getAccount,mintTo } from '@solana/spl-token';

window.Buffer = window.Buffer || require('buffer').Buffer;

const {
  PublicKey,
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");




class App extends Component {

  



async goCall3()
{




  console.log("Here we go escrow")
  
  //phantom flow 
  const isPhantomInstalled = window.solana && window.solana.isPhantom
  if(!isPhantomInstalled)
  {
    alert("Install Phatom Wallet")
    window.open("https://phantom.app/", "_blank");
    return 0
  }

  // Inspect Keypair() object
  const counter = new Keypair();
  let counterKey = counter.publicKey;
  console.log("Counter",counter)
  console.log("Counter Key",counterKey)



  const escrowProgramId = new PublicKey("DkaMZtDCUFwN2N8wA2WQPvMeZ3HUXzoHAnvmUDNwMUKt");
  const connection = new Connection("https://api.devnet.solana.com/");
  const resp = await window.solana.connect();
  const phantomPubKey = new PublicKey(resp.publicKey.toString())


  console.log("Escrow Program :", escrowProgramId.toBase58());
  console.log("Fee payer :",resp.publicKey.toString())




  //generate PDA
  const pdaKey = (await PublicKey.findProgramAddress(
    ["escrow", escrowProgramId.toBuffer()],
    escrowProgramId
  ))[0];
  console.log("PDA :",pdaKey.toBase58())



  //create transaction
  let tx = new Transaction();


  let pdaData = await connection.getAccountInfo(pdaKey)
  console.log(pdaData)




  if (!pdaData) {
    console.log("    -> No pda account found. Creating new pda account");
    console.log("System program ID",SystemProgram.programId.toBase58())

    let pdaAccount_IX = SystemProgram.createAccount({
      fromPubkey: phantomPubKey,
      newAccountPubkey: pdaKey,
      /** Amount of lamports to transfer to the created account */
      lamports: await connection.getMinimumBalanceForRentExemption(8),
      /** Amount of space in bytes to allocate to the created account */
      space: 8,
      /** Public key of the program to assign as the owner of the created account */
      programId: escrowProgramId,
    });


    tx.add(pdaAccount_IX);



  }




  //borsh set up
  function Test (id, data) {
    this.id = 0;
    this.data= 100;
}

  const value = new Test({ id: 0, data: 100});
  const schema = new Map([[Test, { kind: 'struct', fields: [['id', 'u8'], ['data', 'u64']] }]]);
  const buffer = serialize(schema, value);

  //const buffer = Buffer.from(new Uint8Array([1,100]));

  let initEscrow = new TransactionInstruction({
    keys: [
      //fee payer AccountMeta
      {
        pubkey: phantomPubKey,
        isSigner: true,
        isWritable: true,
      },
      //spl token AccountMeta
      {
        pubkey: new PublicKey("5TovBfqCKZnW4KdT3yp6UUUjVVCfjbbqPe8PMtJR9A4h"),
        isSigner: false,
        isWritable: true,
      },
      //spl token program
      {
        pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        isSigner: false,
        isWritable: false,
      }

      

      
    ],
    programId: escrowProgramId,
    data: buffer,
  });

  tx.add(initEscrow);
  let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  console.log("recentBlockhash: ", blockhash);
  tx.recentBlockhash = blockhash;
  tx.feePayer = phantomPubKey;

  
  const { signature } = await window.solana.signAndSendTransaction(tx,{skipPreflight:true});
  console.log(signature)

  window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)



  
}





// BEaixtcJbGqkHx4eFPyCFwv69CoyuKsMpLRCx31sJHeQ

  render() {
    return (
      <div style={{marginTop:window.screen.availHeight/3}} className='center'>
        {/* <button onClick={this.goCall.bind(this)} className='glow'>Send Counter Transaction</button>
        <div style={{marginTop:40}}></div>
        <button onClick={this.goCall2.bind(this)} className='glow'>Send Auth Transaction</button>        
        <div style={{marginTop:40}}></div> */}
        <button onClick={this.goCall3.bind(this)} className='glow'>Init Escrow</button>
        {/* <button onClick={this.goCall.bind(this)} className='glow'>Hello World Program</button> */}
      </div>
    );
  }
}

export default App;
