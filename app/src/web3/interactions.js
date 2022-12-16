import { ethers } from 'ethers'
import { stxAbi } from '../abis/STX'

const STX_ADDRESS = '0x37E90ceC5b6404604C30afc395c9C356b1522C7A'
export const fetchBalance = async () => {
  const abi = stxAbi
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.ankr.com/eth_goerli	',
  )
  const signer = provider.getSigner()
  const contract = new ethers.Contract(STX_ADDRESS, abi, provider)
  const balance = await contract.balanceOf(
    '0x14630821f64ddc3bfc4e25e4bbebe35969b47888',
  )
  console.log(balance)
  return ethers.utils.formatUnits(balance, 18)
}

export const approve = async () => {
  const abi = stxAbi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(STX_ADDRESS, abi, provider)
  const signedContract = contract.connect(signer)
  const swapValue = await signedContract.approve(
    '0x14630821F64DDc3bFc4E25e4bbEbE35969B47888',
    ethers.constants.MaxUint256,
  )
  console.log('approved')
}
export const transfer = async () => {
  const abi = stxAbi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(STX_ADDRESS, abi, provider)
  const signedContract = contract.connect(signer)
  const transferValue = await signedContract.transfer(
    '0x14630821F64DDc3bFc4E25e4bbEbE35969B47888',
    '1',
  )
  console.log('approved')
  return transferValue
}
