import axios from "axios"
import { useState } from "react"
import { Button, Container, FloatingLabel, Form } from "react-bootstrap"
import { setCookie, parseCookies } from "nookies"
import { useRouter } from 'next/router'
import { getStrapiURL } from "../utils/api"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const handleLogin = async (event) => {
    event.preventDefault()
    axios.post(getStrapiURL('/auth/local'), {
      identifier: email,
      password: password
    })
      .then(response => {
        setCookie(null, 'jwt', response.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })
        console.log(response.data.jwt)
        router.push('/')
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  }
  return (
    <Container className="mt-5">
      <h1 className="mb-4">Login to continue</h1>
      <Form onSubmit={handleLogin}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
export async function getServerSideProps(ctx) {
  try {
    const { jwt } = parseCookies(ctx)
    if (jwt)
      return { redirect: { permanent: false, destination: '/' }, props: {} }
    return { props: {} }
  } catch (err) {
    return { props: {} }
  }
}