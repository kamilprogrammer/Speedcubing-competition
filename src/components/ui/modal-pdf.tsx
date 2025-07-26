"use client";

import { useState, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useIsMobile } from "../../app/isMobile";
interface ModalPdfProps {
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  pdf: string;
}

export default function ModalPdf({
  thumbWidth,
  thumbHeight,
  thumbAlt,
  pdf,
}: ModalPdfProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const pdfRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  return (
    <div className="relative">
      {/* Secondary illustration */}

      {/* Video thumbnail */}
      <button
        className="group cursor-none relative flex items-center justify-center rounded-2xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200"
        onClick={() => {
          if (isMobile) {
            window.open(pdf, "_blank");
          } else {
            setModalOpen(true);
          }
        }}
        aria-label="Open the Schedule pdf"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <figure
          onClick={() => {
            if (isMobile) {
              window.open(pdf, "_blank");
            } else {
              setModalOpen(true);
            }
          }}
          className="relative overflow-hidden rounded-2xl before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/20 before:to-gray-900"
        >
          <Image
            onClick={() => {
              if (isMobile) {
                window.open(pdf, "_blank");
              } else {
                setModalOpen(true);
              }
            }}
            className="opacity-50 grayscale"
            src="/images/pdf.webp"
            width={thumbWidth}
            height={thumbHeight}
            priority
            alt={thumbAlt}
          />
        </figure>
        {/* Play icon */}
        <span
          onClick={() => {
            if (isMobile) {
              window.open(pdf, "_blank");
            } else {
              setModalOpen(true);
            }
          }}
          className="pointer-events-none absolute p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-gray-950 before:duration-300 group-hover:before:scale-110"
        >
          <span className="relative flex items-center gap-3">
            <span className="relative inline-block w-6 h-6 bg-gray-600 rounded-lg">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.825rem] font-bold leading-none text-white">
                &#x1F4C7;
              </span>
            </span>

            <span className="text-sm font-medium leading-tight text-gray-300">
              open the Schedule pdf
            </span>
          </span>
        </span>
      </button>
      {/* End: Video thumbnail */}

      <Dialog
        initialFocus={pdfRef}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 z-99999 bg-black/70 transition-opacity duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-99999 flex px-4 py-6 sm:px-6">
          <div className="mx-auto flex h-full max-w-6xl items-center">
            <DialogPanel
              transition
              className="max-h-full w-[120vh] overflow-hidden rounded-2xl bg-black shadow-2xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <iframe
                className="w-[120vh] h-[120vh]"
                src={pdf}
                allowFullScreen
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
