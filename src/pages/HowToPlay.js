import Navbar from '../components/NavBar'

export default function HowToPlay() {
    return (
        <>
            <Navbar />
            <div style={{ background: "linear-gradient(to bottom, black, gray)", color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2em' }}>
                <div style={{
                    width: '50%',
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    textAlign: 'left',
                    color: 'black'
                }}>
                    <div style={{ textAlign: 'center', fontSize: '3em', marginBottom: '1rem' }}>HOW TO PLAY 📋</div>
                    <p style={{ fontSize: '1em', margin: '1rem 0' }}>1. Guess the correct price of various items to earn points! 🔍</p>
                    <p style={{ fontSize: '1em', margin: '1rem 0' }}>2. Each round presents a new item along with its image. Take a moment to evaluate the item before making your guess. 💸</p>
                    <p style={{ fontSize: '1em', margin: '1rem 0' }}>3. Enter your price guess in the provided input field. Make sure to think carefully about your estimate! 🎯</p>
                    <p style={{ fontSize: '1em', margin: '1rem 0' }}>4. If you’re unsure, you can use hints to help guide your guess. Utilize these strategically to improve your chances! ⬆️⬇️</p>
                    <p style={{ fontSize: '1em', margin: '1rem 0' }}>5. Keep an eye on your score as you play. Try to beat your previous high score or challenge friends for a competitive edge! 🏆</p>
                </div>
            </div>
        </>
    )
}
