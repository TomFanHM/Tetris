import { useEffect, useState } from "react"

const useKeyboardControls = () => {
    const keys = {
        ArrowUp: 'forward',
        ArrowDown: 'backward',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        Space: 'space',
        ShiftLeft: "shift"
    }

    const moveFieldByKey = (key: string) => keys[key as keyof typeof keys]

    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        space: false,
        shift: false
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
        }
        const handleKeyUp = (e: KeyboardEvent) => {
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
        }
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return movement
}

export default useKeyboardControls