// islands/WiddeScript.tsx
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function WiddeScript() {
  const loaded = useSignal(false);

  useEffect(() => {
    if (!loaded.value) {
      const script = document.createElement("script");
      script.src = "https://cdn.widde.io/widde.1.1.0.js?v=1.0";
      script.async = true;
      document.body.appendChild(script);
      loaded.value = true;
    }
  }, []);

  return null; 
}