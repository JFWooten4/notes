import type React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {ThemeClassNames} from '@docusaurus/theme-common';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import styles from './styles.module.css';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function DocBreadcrumbs(): React.JSX.Element | null {
  const {pathname} = useLocation();
  const dateParts = pathname.split('/').filter(Boolean);

  if (!/^\d{4}$/.test(dateParts[0] ?? '') || dateParts.length > 3) {
    return null;
  }

  const labels = dateParts.map((part, index) => {
    if (index === 1) {
      return monthNames[Number(part) - 1] ?? part;
    }
    return part;
  });

  return (
    <nav className={`${ThemeClassNames.docs.docBreadcrumbs} ${styles.breadcrumbsContainer}`} aria-label="Breadcrumbs">
      <ul className="breadcrumbs">
        <HomeBreadcrumbItem />
        {labels.map((label, index) => {
          const isLast = index === labels.length - 1;
          const href = `/${dateParts.slice(0, index + 1).join('/')}`;

          return (
            <li
              className={`breadcrumbs__item${isLast ? ' breadcrumbs__item--active' : ''}`}
              key={href}>
              {isLast ? (
                <span className="breadcrumbs__link">{label}</span>
              ) : (
                <Link className="breadcrumbs__link" to={href}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
