import 'bootstrap/scss/bootstrap.scss';
import '../styles/globals.css';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
