'use client'

import { createContext, useContext, useRef } from "react";

interface IframeContextType {
    setIframeRef: (iframe: HTMLIFrameElement) => void;
    sendMessageToIframe: (message: string) => void;
}

const IframeContext = createContext<IframeContextType | null>(null);

export const IframeProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    const setIframeRef = (iframe: HTMLIFrameElement) => {
        iframeRef.current = iframe
    }

    const sendMessageToIframe = (message: string) => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(message, 'http://localhost:3000/screen')
        } else {
            console.warn('Iframe not ready')
        }
    }

    return (
        <IframeContext.Provider value={{ setIframeRef, sendMessageToIframe}}>
            {children}
        </IframeContext.Provider>
    )
}

export const useIframe = () => useContext(IframeContext)