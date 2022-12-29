import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  return (
    <div className='bg-bikes flex flex-col w-full h-screen bg-center bg-cover '>
      <Header />

      {props.children}
      <Footer/>
    </div>
  )
}
export default Layout
