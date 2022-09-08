// import 'bootstrap/scss/bootstrap.scss';
import '@/styles/tailwindcss.css';
import '@/styles/globals.css';
import Layout from '@/components/layout';
import { getAllGroups } from '@/lib/fauna';

const MyApp = ({ Component, pageProps,groups }) => {
  return (
    <>
      <Layout groups={groups}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;

MyApp.getInitialProps = async (ctx) => {
  const data = await getAllGroups()
  return { groups: data }
}