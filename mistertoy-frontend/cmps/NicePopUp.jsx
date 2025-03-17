import { useEffect } from "react"
import PropTypes from "prop-types"


export function NicePopup({ heading, children, footer, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <div className="popup-overlay">
            <div className="popup">
                <header>
                    <h2>{heading}</h2>
                    <button onClick={onClose} className="close-btn">✖</button>
                </header>
                <main>{children}</main>
                <footer>{footer}</footer>
            </div>
        </div>
    )
}

NicePopup.propTypes = {
    heading: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}