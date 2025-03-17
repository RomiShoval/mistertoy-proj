import { useState, useEffect } from 'react'

export function Chat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    function handleSendMessage() {
        if (!input.trim()) return

        const userMsg = { sender: "Ya", text: input }
        setMessages((prev) => [...prev, userMsg])
        setInput("")

        // Auto-response after a short delay
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "Support", text: "Sure thing honey" },
            ])
        }, 1000)
    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`chat-msg ${msg.sender}`}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}