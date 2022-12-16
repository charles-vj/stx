import { ConnectButton } from '@rainbow-me/rainbowkit'
import './App.css'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'
function App() {
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
              Enter the address you want to mint our very real STX token to
            </FormLabel>
            <Input
              variant="filled"
              placeholder="small size"
              size="sm"
              type="email"
            />
            <FormHelperText>Goerli address please</FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="main">
        <div className="minter">
          <FormControl>
            <FormLabel>
              Enter the address you want to mint our very real STX token to
            </FormLabel>
            <Input
              variant="filled"
              placeholder="small size"
              size="sm"
              type="email"
            />
            <FormHelperText>Goerli address please</FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default App
