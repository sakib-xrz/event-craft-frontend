import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function QrCode({ text }: { text: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text) return;

    try {
      setIsGenerating(true);
      const canvas = canvasRef.current;

      if (canvas) {
        await QRCode.toCanvas(canvas, text, {
          width: 150,
          margin: 1,
          errorCorrectionLevel: "M",
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });

        setQrCode(canvas.toDataURL("image/png"));
      }
    } catch (error) {
      toast.error("Error generating QR code");
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("QR Code downloaded");
  };

  useEffect(() => {
    generateQRCode();
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative">
          <canvas ref={canvasRef} className="hidden" />
          {qrCode && (
            <Image
              src={qrCode || "/placeholder.svg"}
              alt="Generated QR Code"
              className="rounded-md border"
              width={150}
              height={150}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row mt-2">
        <Button
          onClick={downloadQRCode}
          className="flex-1"
          disabled={!qrCode || isGenerating}
          variant="outline"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
