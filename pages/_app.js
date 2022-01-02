import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'next/app';
import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import { UserContextProvider } from '../components/miscs/UserContextProvider';
import { getStrapiURL } from '../utils/api';

class MyApp extends App {
  render() {
    const { Component, pageProps, user } = this.props;
    return <UserContextProvider user={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  }
}

export default MyApp

MyApp.getInitialProps = async ({ ctx }) => {

  const { jwt } = parseCookies(ctx)

  if (jwt) {
    try {
      const { data } = await axios.get(getStrapiURL('/users/me'), { headers: { Authorization: `Bearer ${jwt}` } })
      return { user: data };
    }
    catch (e) { return {} }
  }
  return {};
}
