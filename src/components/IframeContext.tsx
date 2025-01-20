'use client'

import { createContext, useContext, useRef } from 'react'
import { IframeMessage } from '../../types/types'

interface IframeContextType {
    setIframeRef: (iframe: HTMLIFrameElement) => void
    sendMessageToIframe: (message: IframeMessage) => void
}

const IframeContext = createContext<IframeContextType | null>(null)

export const IframeProvider = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    const setIframeRef = (iframe: HTMLIFrameElement) => {
        iframeRef.current = iframe
    }

    const sendMessageToIframe = (message: IframeMessage) => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(
                message,
                process.env.NEXT_PUBLIC_IFRAME_URL as string,
            )
        } else {
            console.warn('Iframe not ready')
        }
    }

    return (
        <IframeContext.Provider value={{ setIframeRef, sendMessageToIframe }}>
            {children}
        </IframeContext.Provider>
    )
}

export const useIframe = () => useContext(IframeContext)
