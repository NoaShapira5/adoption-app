import subLogo1 from '../assets/subLogo1.png'
import subLogo2 from '../assets/subLogo2.png'

function Footer() {
    const footerYear = new Date().getFullYear()
  return (
    <footer className='footer'>
        <p>Copyright &copy; {footerYear} All rights reserved</p>
        <img src={subLogo2} alt="משרד החקלאות" className='subLogo'/>
        <img src={subLogo1} alt="שירותים וטרינרים גוש דן" className='subLogo'/>
    </footer>
  )
}

export default Footer
