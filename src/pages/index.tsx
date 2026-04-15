import type React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const highlights = [
  {
    title: 'Year-based archive',
    body: 'Existing notes are organized into a Docusaurus docs tree that mirrors the repository structure.',
  },
  {
    title: 'TypeScript setup',
    body: 'The site configuration, homepage, and build tooling are set up in TypeScript.',
  },
  {
    title: 'Source-first workflow',
    body: 'Original note files remain in place and a sync script regenerates docs content automatically.',
  },
];

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Notes"
      description="Public working notes published with Docusaurus">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroPanel}>
            <p className={styles.kicker}>Public archive</p>
            <h1 className={styles.title}>Working notes as a TypeScript Docusaurus site.</h1>
            <p className={styles.subtitle}>
              Browse year-based notes, keep the original source files, and regenerate docs from the
              repository with one command.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs">
                Open docs
              </Link>
              <Link className={clsx('button button--secondary button--lg', styles.secondary)} to="/docs/notes">
                Browse notes
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.grid}>
          {highlights.map((item) => (
            <article key={item.title} className={styles.card}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
