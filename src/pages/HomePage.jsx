import Section from '../components/Section'
import Header from '../components/Header/Header'
import Heading from '../components/Heading/Heading'
import Form from '../components/Form/Form'
import Services from '../components/Services/Services'
import '../App.css'

function HomePage() {

  return (
    <>
    <Header />
    <Section className='body'>
      <Heading />
      <Form />
      <Services />
    </Section>
    </>
  )
}

export default HomePage
