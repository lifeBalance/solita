import spinner from '../assets/spinner.png'

export default function Spinner(props) {
  return (
    <p className='flex justify-center items-center'>
      <img src={spinner} alt="spinner" className='inline w-12 animate-spin hue-rotate-90'/> 
    </p>
  )
}