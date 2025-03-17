import { useEffect } from 'react'

export function useConfirmTabClose(isUnsafeTabClose) {
    const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?'
    useEffect(() => {
        function handleBeforeUnload(ev) {
            if (isUnsafeTabClose) {
                ev.returnValue = confirmationMessage
                return confirmationMessage
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isUnsafeTabClose])
}