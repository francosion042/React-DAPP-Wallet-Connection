import './App.css';
import React,{useState, useEffect} from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';

function App() {
  let provider 
  const [account, setAccount] = useState(false)
  const infuraId = "27e484dcd9e3efcfd25a83a78777cdf1"
  const qrcodeModalOptions =  {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      }

  // const isWalletConnected = async () => {
  //   //  Create WalletConnect Provider
  //   provider = new WalletConnectProvider({infuraId, qrcodeModalOptions});

  //   if (provider.connected) {
  //     //  Create Web3 instance
  //     const web3 = new Web3(provider);
  //     const accounts = await web3.eth.getAccounts()

  //     setAccount(accounts[0])
  //     console.log('checking ...', accounts)
  //   }
  // }

  const connectWallet = async () => {

    //  Create WalletConnect Provider
    provider = new WalletConnectProvider({infuraId, qrcodeModalOptions});
    
    //  Enable session (triggers QR Code modal)
    await provider.enable()
    .catch(async (err) => { 
      console.log(err)
    });

    if (provider.connected) {
      //  Create Web3 instance
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)

      setAccount(accounts[0])
    }

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
    });
    

  }

  // useEffect(() => {
  //   console.log('hello')
  //   isWalletConnected()
  // }, [])


  return (
    <div className="App">
      <header className="App-header">
        {
          account && (
            <>
              <h1> Connected </h1>
              <h3>Connected Account: <br /> <span style={{color: 'red'}}>{account}</span></h3>
            </>
          )
        }
        {
          !account && (
            <button className="connect-btn" onClick={() => connectWallet()}>Connect Wallet</button>
          )
        }
      </header>
    </div>
  );
}

export default App;
