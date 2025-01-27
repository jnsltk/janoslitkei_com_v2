import Image from 'next/image'
import macIcon from '../../../../public/pc/screen/ui/macintosh_icon.png'
import hello from '../../../../public/pc/screen/ui/hello.png'

interface WelcomeProps {
    showMsg: boolean
}

export default function Welcome({ showMsg }: WelcomeProps) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-monitor-bg">
            {!showMsg ? (
                <Image
                    src={macIcon}
                    alt="An icon of a Macintosh computer"
                ></Image>
            ) : (
                <Image
                    src={hello}
                    alt="A handwritten note that says 'Hello'"
                    className="h-auto w-4/5"
                ></Image>
            )}
        </div>
    )
}
