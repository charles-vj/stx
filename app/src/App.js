import { ConnectButton } from '@rainbow-me/rainbowkit'
import './App.css'
import { FaGithub } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Skeleton,
  useToast,
  Heading,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { approve, fetchBalance, mint, transfer } from './web3/interactions'
import { ethers } from 'ethers'
function App() {
  const toast = useToast()
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState('0')
  const [mintValue, setMintValue] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [transferValue, setTransferValue] = useState('')
  const [transferAddress, setTransferAddress] = useState('')
  const [mintLoader, setMintLoader] = useState(false)
  const [transferLoader, setTransferLoader] = useState(false)
  useEffect(() => {
    const onFetch = async () => {
      const response = await fetchBalance(address)
      setBalance(response)
    }
    onFetch()
  }, [address])

  const handleMintChange = (event) => setMintValue(event.target.value)
  const handleMintAddressChange = (event) => setMintAddress(event.target.value)
  const handleTransferChange = (event) => setTransferValue(event.target.value)
  const handleTransferAddressChange = (event) =>
    setTransferAddress(event.target.value)

  const handleToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
    })
  }

  const handleMint = async () => {
    const isValidAddress = await ethers.utils.isAddress(mintAddress)
    if (!isValidAddress) {
      handleToast('Transaction Failed', 'Transfer address invalid', 'error')
      return
    }
    if (isNaN(mintValue)) {
      handleToast('Transaction Failed', 'Amount Invalid', 'error')
      return
    }
    setMintLoader(true)
    const mintResponse = await mint(mintAddress, mintValue)
    if (mintResponse) {
      handleToast('Transaction Failed', mintResponse, 'error')
    } else {
      handleToast('Transaction successful', 'Succesfully minted', 'success')
    }
    const response = await fetchBalance(address)
    console.log('Setting balance')
    setBalance(response)
    setMintLoader(false)
  }
  const handleTransfer = async () => {
    if (isNaN(transferValue)) {
      handleToast('Transaction Failed', 'Amount Invalid', 'error')
      return
    }
    const balance = await fetchBalance(address)
    if (balance < transferValue) {
      handleToast(
        'Transaction Failed',
        'Amount to be transferred should be less than balance',
        'error',
      )
      return
    }
    const isValidAddress = await ethers.utils.isAddress(transferAddress)
    if (!isValidAddress) {
      handleToast('Transaction Failed', 'Transfer address invalid', 'error')
      return
    }
    setTransferLoader(true)
    const transferResponse = await transfer(transferAddress, transferValue)
    if (transferResponse) {
      handleToast('Transaction Failed', transferResponse, 'error')
    } else {
      handleToast('Transaction successful', 'Succesfully swapped', 'success')
    }
    const response = await fetchBalance(address)
    console.log('Setting balance')

    setBalance(response)
    setTransferLoader(false)
  }

  return (
    <div className="App">
      <div className="nav">
        <div className="logo">
          <Heading>Mintinator</Heading>
        </div>
        <div className="connect">
          <ConnectButton />
        </div>
      </div>

      <div className="main">
        <div className="minter">
          <FormControl>
            <FormLabel>
              <Center fontSize={'3xl'}>Faucet</Center>
            </FormLabel>
            <Skeleton isLoaded={isConnected}>
              <Input
                value={mintAddress}
                onChange={handleMintAddressChange}
                focusBorderColor="pink.400"
                variant="filled"
                placeholder="Goerli address"
                size="sm"
                type="email"
                isRequired
              />
            </Skeleton>
            <FormHelperText>
              {isConnected ? (
                <>
                  Enter the address you want to mint our very real STX token to
                </>
              ) : (
                <>Connect your wallet first</>
              )}
            </FormHelperText>
            <Skeleton isLoaded={isConnected}>
              <Input
                mt={2}
                value={mintValue}
                onChange={handleMintChange}
                focusBorderColor="pink.400"
                variant="filled"
                placeholder="Amount"
                size="sm"
                type="email"
                isRequired
              />
            </Skeleton>
            <FormHelperText>
              {isConnected ? (
                <>Amount of tokens to be minted</>
              ) : (
                <>Connect your wallet first</>
              )}
            </FormHelperText>
            <Center>
              <Button
                variant="outline"
                colorScheme="pink"
                my={4}
                onClick={handleMint}
                isDisabled={!isConnected}
                isLoading={mintLoader}
              >
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
              <Center fontSize={'3xl'}>Swapper</Center>
            </FormLabel>
            <Skeleton isLoaded={isConnected}>
              <Input
                value={transferAddress}
                onChange={handleTransferAddressChange}
                variant="filled"
                placeholder="Goerli address"
                size="sm"
                type="email"
                isRequired
              />
            </Skeleton>

            <FormHelperText>
              {isConnected ? (
                <>Enter the address you want to transfer your STX to</>
              ) : (
                <>Connect your wallet first</>
              )}
            </FormHelperText>
            <Skeleton isLoaded={isConnected}>
              <Input
                value={transferValue}
                onChange={handleTransferChange}
                variant="filled"
                placeholder="Amount"
                size="sm"
                type="email"
                mt={2}
                isRequired
              />
            </Skeleton>

            <FormHelperText>
              {isConnected ? (
                <>Your balance : {balance} STX</>
              ) : (
                <>Connect your wallet first</>
              )}
            </FormHelperText>
            <Center>
              <Button
                onClick={handleTransfer}
                variant="outline"
                m={4}
                colorScheme="blue"
                isLoading={transferLoader}
                isDisabled={!isConnected}
              >
                Transfer
              </Button>
            </Center>
          </FormControl>
        </div>
      </div>
      <div className="footer">
        <a href="https://github.com/charles-vj/streax">
          {' '}
          <FaGithub />{' '}
        </a>{' '}
        <a href="https://twitter.com/Charles_V_J">
          {' '}
          <FaTwitter />
        </a>{' '}
        <a href="https://www.linkedin.com/in/charles-v-j-641913187/">
          {' '}
          <FaLinkedin />
        </a>
      </div>
    </div>
  )
}

export default App
