import Navbar from '../components/NavBar'
export default function About(){
    return(
    <>
        <Navbar/>
        <div style={{background: "linear-gradient(to bottom, black, gray)", color: 'white', minHeight: '100vh'}}>
        <p style={{textAlign: 'center', fontSize: '3em'}}>About</p>
        </div>
    </>
    )
}