

import { Toaster } from 'react-hot-toast';
import RouterPrincipal from './Router/RouterPrincipal'
import {HeroUIProvider} from "@heroui/react";

function App() {
  
  return (
    <div id="App" className='w-full h-full'>
      <HeroUIProvider className='w-full h-full'>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterPrincipal/>
      </HeroUIProvider>
    </div>
  )
}

export default App
