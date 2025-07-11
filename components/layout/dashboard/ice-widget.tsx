"use client"

export function IceWidget() {
  return (
    <div
      className="bg-[#171717] border border-gray-800 overflow-hidden"
      style={{
        width: "300px",
        height: "320px",
        borderRadius: "24px",
        opacity: 1,
      }}
    >
      <div
        className="relative h-full p-6 flex flex-col justify-end"
        style={{
          backgroundImage: "url('/assets/images/News widget-image.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
    
        {/* <div className="absolute top-4 left-4">
          <span className="text-xs text-white bg-teal-600 px-2 py-1 rounded font-medium">ICE</span>
        </div> */}


        {/* <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <span className="text-white text-xs">📰</span>
          </div>
        </div> */}


        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-white/20">bp</div>
        </div> */}


        {/* <div className="relative z-10">
          <div className="text-xs text-green-100 mb-2">Vanguard</div>
          <h3 className="text-white font-semibold text-sm leading-tight">
            Shareholders Enjoy a Massive Windfall as BP Expands Global...
          </h3>
        </div> */}
      </div>
    </div>
  )
}
