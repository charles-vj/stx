import { ConnectButton } from '@rainbow-me/rainbowkit'
import './App.css'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { approve, fetchBalance, transfer } from './web3/interactions'
function App() {
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState('0')
  const [mintLoader, setMintLoader] = useState(false)
  const [approveLoader, setApproveLoader] = useState(false)
  const [transferLoader, setTransferLoader] = useState(false)
  useEffect(() => {
    const onFetch = async () => {
      const response = await fetchBalance()
      setBalance(response)
    }
    onFetch()
  }, [])

  const handleApprove = async () => {
    setApproveLoader(true)
    approve()
    setApproveLoader(false)
  }
  const handleTransfer = async () => {
    setTransferLoader(true)
    transfer()
    setTransferLoader(false)
  }

  return (
    <div className="App">
      <div className="nav">
        <div className="logo">Mintinator</div>
        <div className="connect">
          <ConnectButton />
        </div>
      </div>

      <div className="main">
        <div className="minter">
          <FormControl>
            <FormLabel>
              <Center>Faucet</Center>
            </FormLabel>
            <Input
              focusBorderColor="pink.400"
              variant="filled"
              placeholder="Goerli address"
              size="sm"
              type="email"
            />
            <FormHelperText>
              Enter the address you want to mint our very real STX token to
            </FormHelperText>
            <Center>
              <Button variant="outline" colorScheme="pink" my={4}>
                Mint
              </Button>
            </Center>
          </FormControl>
        </div>
      </div>
      <div className="main">
        <div className="minter">
          <FormControl>
            <FormLabel>
              <Center>Swapper</Center>
            </FormLabel>
            <Input
              variant="filled"
              placeholder="Goerli address"
              size="sm"
              type="email"
            />
            <FormHelperText>
              Enter the address you want to transfer your STX to
            </FormHelperText>
            <Input
              variant="filled"
              placeholder="Amount"
              size="sm"
              type="email"
            />
            <FormHelperText>Your balance : {balance} STX</FormHelperText>
            <Center>
              <Button
                onClick={handleApprove}
                variant="outline"
                m={4}
                colorScheme="blue"
                isLoading={approveLoader}
              >
                Approve
              </Button>
              <Button
                onClick={handleTransfer}
                variant="outline"
                m={4}
                colorScheme="blue"
                isLoading={transferLoader}
              >
                Transfer
              </Button>
            </Center>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default App
