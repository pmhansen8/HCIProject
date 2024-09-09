import Navbar from '../components/NavBar'
export default function About(){
    return(
    <>
        <Navbar/>
        <div style={{backgroundColor: 'black', color: 'white', minHeight: '100vh'}}>
        <p style={{textAlign: 'center', fontSize: '3em'}}>About</p>
        </div>
    </>
    )
}