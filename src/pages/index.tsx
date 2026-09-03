import type React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): React.JSX.Element {
  return (
    <Layout description="Public working notes organized by date.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroPanel}>
            <h1 className={styles.title}>Notes</h1>
            <p className={styles.subtitle}>Public working notes, organized by date.</p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/2026/3/6">
                Read the latest note
              </Link>
              <Link
                className={clsx('button button--secondary button--lg', styles.secondary)}
                to="https://github.com/JFWooten4/notes">
                GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
