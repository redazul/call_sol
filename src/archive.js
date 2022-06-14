// initialize(tracker, user, authority, counter, trackerProgramId){
//     return new TransactionInstruction({
//       keys: [
//         {
//           pubkey: tracker,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: user,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: authority,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: counter,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: SystemProgram.programId,
//           isSigner: false,
//           isWritable: false,
//         },
//       ],
//       data: Buffer.from(new Uint8Array([0])),
//       programId: trackerProgramId,
//     });
//   };

//   increment(tracker, user, authority, counter, counterProgramId, trackerProgramId){
//     return new TransactionInstruction({
//       keys: [
//         {
//           pubkey: tracker,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: user,
//           isSigner: true,
//           isWritable: false,
//         },
//         {
//           pubkey: counterProgramId,
//           isSigner: false,
//           isWritable: false,
//         },
//         {
//           pubkey: counter,
//           isSigner: false,
//           isWritable: true,
//         },
//         {
//           pubkey: authority,
//           isSigner: false,
//           isWritable: false,
//         },
//       ],
//       data: Buffer.from(new Uint8Array([1])),
//       programId: trackerProgramId,
//     });
//   };




// //counter program
// async goCall()
// {

//   //phantom flow 
//   const isPhantomInstalled = window.solana && window.solana.isPhantom
//   if(!isPhantomInstalled)
//   {
//     alert("Install Phatom Wallet")
//     window.open("https://phantom.app/", "_blank");
//     return 0
//   }


//   console.log("Here we go")

//   const programId = new PublicKey("JDwyzRvF9MN8ZBXu9cmubQMN16DYNASkkMidUw7sHpdr"); //counter
//   const connection = new Connection("https://api.devnet.solana.com/");

//   const resp = await window.solana.connect();
//   console.log(resp)
//   console.log(resp.publicKey.toString())

//   const phantomPubKey = new PublicKey(resp.publicKey.toString())

  
//   const feePayer = new Keypair();

//   // console.log("Requesting Airdrop of 1 SOL...");
//   // await connection.requestAirdrop(feePayer.publicKey, 2e9);
//   // console.log("Airdrop received");

//   const counter = new Keypair();
//   let counterKey = counter.publicKey;
//   let tx = new Transaction();
//   let signers = [feePayer];



//   console.log("Generating new counter address");
//   let createIx = SystemProgram.createAccount({
//     fromPubkey: phantomPubKey,
//     newAccountPubkey: counterKey,
//     /** Amount of lamports to transfer to the created account */
//     lamports: await connection.getMinimumBalanceForRentExemption(16),
//     /** Amount of space in bytes to allocate to the created account */
//     space: 16,
//     /** Public key of the program to assign as the owner of the created account */
//     programId: programId,
//   });
  
//   tx.add(createIx);
  

//   const idx = Buffer.from(new Uint8Array([0]));

//   let incrIx = new TransactionInstruction({
//     keys: [
//       {
//         pubkey: counterKey,
//         isSigner: false,
//         isWritable: true,
//       }
//     ],
//     programId: programId,
//     data: idx,
//   });


//   // // Flexible class that takes properties and imbues them
//   // // to the object instance
//   // class Assignable {
//   //   constructor(properties) {
//   //     Object.keys(properties).map((key) => {
//   //       return (this[key] = properties[key]);
//   //     });
//   //   }
//   // }

//   // // Our instruction payload vocabulary
//   // class Payload extends Assignable {}

//   // // Borsh needs a schema describing the payload
//   // const payloadSchema = new Map([
//   //   [
//   //     Payload,
//   //     {
//   //       kind: "struct",
//   //       fields: [
//   //         ["id", "u8"],
//   //         ["key", "string"],
//   //         ["value", "u8"],
//   //       ],
//   //     },
//   //   ],
//   // ]);

//   // // Construct the payload
//   // const mint = new Payload({
//   //   id: 1,
//   //   key: "mul", // 'ts key'
//   //   value: 100, // 'ts first value'
//   // });

//   // // Serialize the payload
//   // const mintSerBuf = Buffer.from(serialize(payloadSchema, mint));
//   // // console.log(mintSerBuf)


//   // console.log(mintSerBuf)
//   // let mintPayloadCopy = deserialize(payloadSchema, Payload, mintSerBuf)
//   // console.log(mintPayloadCopy)

//   //////////////// TRYYYYYYYYYYYY 22222222222222
//     function Test (id, data) {
//       this.id = 1;
//       this.data= 100;
//   }

//   const value = new Test({ id: 1, data: 100});
//   const schema = new Map([[Test, { kind: 'struct', fields: [['id', 'u8'], ['data', 'u64']] }]]);
//   const buffer = serialize(schema, value);

//   //const buffer = Buffer.from(new Uint8Array([1,100]));

//   let MulIx = new TransactionInstruction({
//     keys: [
//       {
//         pubkey: counterKey,
//         isSigner: false,
//         isWritable: true,
//       }
//     ],
//     programId: programId,
//     data: buffer,
//   });

//   tx.add(incrIx);
//   tx.add(MulIx);
//   tx.recentBlockhash = await connection.recentBlockhash
//   console.log(tx)
//   let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
//   console.log("recentBlockhash: ", blockhash);
//   tx.recentBlockhash = blockhash;
//   tx.feePayer = phantomPubKey;

//   tx.partialSign(counter)

//   console.log(tx)

//   const { signature } = await window.solana.signAndSendTransaction(tx,{skipPreflight:true});
//   console.log(signature)

//   window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
//   //await connection.confirmTransaction(signature);

//   // let data = (await connection.getAccountInfo(counterKey)).data;
//   // let count = new BN(data, "le");
//   // console.log("Counter Key:", counterKey.toBase58());
//   // console.log("Count: ", count.toNumber());




// }

// //auth program
// async goCall2()
// {

//   //phantom flow 
//   const isPhantomInstalled = window.solana && window.solana.isPhantom
//   if(!isPhantomInstalled)
//   {
//     alert("Install Phatom Wallet")
//     window.open("https://phantom.app/", "_blank");
//     return 0
//   }


//   console.log("Auth flow")

//   const trackerProgramId = new PublicKey("2VE86vbitM7KsDmwsi8fAYd7MAHUCCUaFWiRJUK7D6C1");
//   const counterProgramId = new PublicKey("EuMLTb1agRSf2hM4eUbZxoNn47y6YW2MTWsyEinP79ks");

//   console.log("Tracker Program", trackerProgramId.toBase58());
//   console.log("Counter Program", counterProgramId.toBase58());
//   const connection = new Connection("https://api.devnet.solana.com/");

//   const resp = await window.solana.connect();
//   console.log(resp)
//   console.log(resp.publicKey.toString())

//   const phantomPubKey = new PublicKey(resp.publicKey.toString())

//   const counter = new Keypair();
//   let counterKey = counter.publicKey;

//   let tx = new Transaction();

//   if ((await connection.getBalance(phantomPubKey)) < 0.1) {
//     console.log("Requesting Airdrop of 1 SOL...");
//     await connection.requestAirdrop(phantomPubKey, 2e9);
//     console.log("Airdrop received");
//   }

  
//   console.log("Generating new counter address");
//   let createIx = SystemProgram.createAccount({
//     fromPubkey: phantomPubKey,
//     newAccountPubkey: counterKey,
//     /** Amount of lamports to transfer to the created account */
//     lamports: await connection.getMinimumBalanceForRentExemption(40),
//     /** Amount of space in bytes to allocate to the created account */
//     space: 40,
//     /** Public key of the program to assign as the owner of the created account */
//     programId: counterProgramId,
//   });
  
//   tx.add(createIx);

//   const trackerKey = (await PublicKey.findProgramAddress(
//     [phantomPubKey.toBuffer(), counterKey.toBuffer()],
//     trackerProgramId
//   ))[0];
//   const authKey = (await PublicKey.findProgramAddress(
//     [counterKey.toBuffer()],
//     trackerProgramId
//   ))[0];

//   console.log(trackerKey.toBase58())
//   console.log(authKey.toBase58())

//   let trackerData = await connection.getAccountInfo(trackerKey)
//   if (!trackerData) {
//     console.log("    -> No tracker account found. Creating new tracker account");
//     const initializeIx = this.initialize(
//       trackerKey,
//       phantomPubKey,
//       authKey,
//       counterKey,
//       trackerProgramId
//     );
//     tx.add(initializeIx);
//   }

//   console.log("Incrementing counter");
//   const trackerInstruction = this.increment(
//     trackerKey,
//     phantomPubKey,
//     authKey,
//     counterKey,
//     counterProgramId,
//     trackerProgramId
//   )
//   tx.add(trackerInstruction);

//   console.log(tx)

//   let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
//   console.log("recentBlockhash: ", blockhash);
//   tx.recentBlockhash = blockhash;
//   tx.feePayer = phantomPubKey;

//   tx.partialSign(counter)

//   console.log(tx)

//   const { signature } = await window.solana.signAndSendTransaction(tx,{skipPreflight:true});
//   console.log(signature)

//   window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)



// }