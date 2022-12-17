import { ethers } from 'ethers'
import { stxAbi } from '../abis/STX'

const STX_ADDRESS = '0x37E90ceC5b6404604C30afc395c9C356b1522C7A'
export const fetchBalance = async (address) => {
  const abi = stxAbi
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.ankr.com/eth_goerli	',
  )
  const contract = new ethers.Contract(STX_ADDRESS, abi, provider)
  const balance = await contract.balanceOf(address)
  console.log('FETCHING BALANCE')
  return ethers.utils.formatUnits(balance, 18)
}

export const transfer = async (address, amount) => {
  try {
    amount = ethers.utils.parseUnits(amount)
  } catch (e) {
    return e.message
  }
  const abi = stxAbi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(STX_ADDRESS, abi, provider)
  const signedContract = contract.connect(signer)

  try {
    const transferValue = await signedContract.transfer(address, amount)
    await transferValue.wait()
  } catch (e) {
    console.log(e.message)
    return e.message.substring(0, 25)
  }
}
export const mint = async (address, amount) => {
  try {
    amount = ethers.utils.parseUnits(amount)
  } catch (e) {
    return e.message
  }
  console.log(amount)
  console.log(address)
  const abi = stxAbi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(STX_ADDRESS, abi, provider)
  const signedContract = contract.connect(signer)
  try {
    const transferValue = await signedContract.mint(address, amount)
    await transferValue.wait()
  } catch (e) {
    console.log(e.message.substring(0, 25))
    return e.message.substring(0, 25)
  }
}
