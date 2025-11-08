import { useEffect } from "react";

export const Image3D = () => {
    
      useEffect(() => {
        // Cargar el script de model-viewer
        const script = document.createElement("script");
        script.type = "module";
        script.src =
          "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js";
        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      }, []);

    return (
      <div>
        <h2>PAGINA 3D</h2>
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Casco Espacial
          </h2>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <model-viewer
              src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
              alt="Casco de astronauta"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            🖱️ Arrastra para rotar • 🔍 Scroll para zoom • ⏸️ Click para pausar
            rotación
          </p>
        </section>
      </div>
    );
}