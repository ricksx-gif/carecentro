export default function HomePage() {
  return (
    <div className="
       min-h-screen
       w-full
       flex items-center justify-center
       bg-gradient-to-br from-black via-zinc-900 to-black
    ">

      {/* IZQUIERDA - BRANDING */}
      <div className="hidden md:flex items-center justify-center">
        
        {/* GLOW*/}
        <div className="
          absolute
          w-80 h-80
          bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-green-500/30
          blur-3xl
          ruonded-full
          opacity-100 
          animate-[pulse_5s_ease-in-out_infinite]
        "/>

        {/* LOGO */}
        <img
        src="/logo.png"
        alt="Velora"
        className="w-64 md:w-80 relative z-12 opacity-90 animate-[pulse_5s_ease-in-out_infinite]"
        />
      </div>
     
      {/* DERECHA - CONTENIDO */}
      <div className="flex p-8 md:p-10 items-center justify-center md:justify-center">
        
        <div className="
            w-full max-w-md
            md:translate-x-20
            rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_0_40px_rgba(255,255,255,0.05)] shadow-black/20
            p-8 space-y-6
        ">
          <h1 className="
            text-3xl font-semibold
            bg-gradient-to-r from-white to-white/60
            bg-clip-text text-transparent
            text-center
          ">
            Velora
          </h1>

          <p className="text-white/50 text-sm text-center">
          Plataforma de gestión para centros de cuidado de adultos mayores
          </p>

          <div className="flex flex-col gap-4 pt-6">

            {/* BOTON PRINCIPAL */}
            <a href="/login">
              <button className="
                 w-full py-2.5 rounded-lg
                 bg-white/30 backdrop-blur-md
                 hover:bg-white/40
                 border border-white/20
                 transition
                 ">
                Iniciar sesión
              </button>
              </a>

              {/* BOTON SECUNDARIO*/}
              <a href="/register">
                <button className="
                 w-full py-2.5 rounded-lg
                 bg-white/10 backdrop-blur-md
                 hover:bg-white/60
                 border border-white/10
                 transition
                ">
                  Crear cuenta 
                </button>
              </a>

          </div>
        </div>
      </div>
    </div>
  )
}