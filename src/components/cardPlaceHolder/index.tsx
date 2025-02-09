function CardPlaceHolder() {
  return (
    <div className="min-w-[250px] h-full max-w-[300px] flex flex-col bg-card-bg justify-center items-center p-5 rounded-lg mx-auto ">
      <div className="flex flex-col gap-y-2 relative">
        <div className="w-[264px] h-[380px] flex rounded-lg overflow-hidden relative bg-gray-800 animate-pulse"></div>
      </div>
      <div className="py-2 w-full relative">
        <div className="w-full h-[20px] bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
      <div className=" w-full relative">
        <div className="w-full h-[40px] bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

export default CardPlaceHolder;
