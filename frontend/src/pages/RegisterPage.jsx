
const RegisterPage = () => {

  const gridButton = "bg-white w-full h-20 flex items-center justify-center rounded-sm p-2 shadow-[0_2px_5px_rgba(0,0,0,0.30)] ";

  return (
    <>
      <div className="grid grid-cols-1 max-w-5xl gap-4 mx-auto p-8 md:grid-cols-2 lg:grid-cols-3">
        <div className={gridButton}>1</div>
        <div className={gridButton}>2</div>
        <div className={gridButton}>3</div>
        <div className={gridButton}>4</div>
      </div>
    </>
  )
}

export default RegisterPage