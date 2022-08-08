import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts - Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>React Native: Under the Hood</strong>
            <p>React Native is a JavaScript library that allows us to create mobile apps that will run on both Android and iOS. As they sell it, “Learn once, write anywhere.” Over the past two years, it has led the market and doesn’t seem to be slowing down.</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>React Native: Under the Hood</strong>
            <p>React Native is a JavaScript library that allows us to create mobile apps that will run on both Android and iOS. As they sell it, “Learn once, write anywhere.” Over the past two years, it has led the market and doesn’t seem to be slowing down.</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>React Native: Under the Hood</strong>
            <p>React Native is a JavaScript library that allows us to create mobile apps that will run on both Android and iOS. As they sell it, “Learn once, write anywhere.” Over the past two years, it has led the market and doesn’t seem to be slowing down.</p>
          </a>
        </div>
      </main>
    </>
  );
}