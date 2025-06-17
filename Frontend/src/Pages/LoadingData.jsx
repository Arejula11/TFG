
export const LoadingData = () => {

    return (
      <div className="w-full h-full flex flex-col items-center align-middle justify-center">
          <img src={"logo.svg"} alt="Logo" />
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-blueGreen text-7xl font-semibold">Cargando...</h1>
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orangeSalud"></div>
          </div>
      </div>
    )
  }