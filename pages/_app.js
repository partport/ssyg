// import 'bootstrap/scss/bootstrap.scss';
import '@/styles/tailwindcss.css';
import '@/styles/globals.css';
import Layout from '@/components/layout';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

const fetcher = (...args) => axios(...args).then((res) => res.data);
const API_PATH = '/api/groups';

const MyApp = ({ Component, pageProps }) => {
  const { data, error } = useSWR(API_PATH, fetcher);

  return (
    <>
      <Layout groups={data}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
