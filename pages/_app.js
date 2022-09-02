import "bootstrap/scss/bootstrap.scss";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <main className="container">
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}

export default MyApp;
