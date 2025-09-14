
import {Button} from "@heroui/react";



function App() {
  
  return (
    <div id="App" className='w-full h-full'>
        <img src={"logo.svg"} alt="Logo" />
        <h1 className="text-blueGreen text-7xl font-semibold mt-3">Bienvenido al sistema</h1>
         <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
        {/* <RouterPrincipal/> */}
    </div>
  )
}

export default App
