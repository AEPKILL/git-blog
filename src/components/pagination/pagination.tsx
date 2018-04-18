import i18n from '@i18n/index';
import classnames from '@utils/classnames';
import * as React from 'react';

import './pagination.scss';

export interface PaginationProps {
  total: number;
  pageSize: number;
  current?: number;
  onChange?(page?: number): void;
}

const PAGE_SHOW = 10;

const Pagination: React.SFC<PaginationProps> = props => {
  const { total, pageSize, current = 0 } = props;
  const totalPage = Math.ceil(total / pageSize);
  let pages: number[] = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i);
  }
  let paginationElement: JSX.Element | null = null;
  if (pages.length > PAGE_SHOW) {
    let start = current - 4 >= 0 ? current : 0;
    let end = start + 5;
    if (end >= pages.length) {
      start = 0;
      end = pages.length - 1;
    }
    pages = pages.slice(start, end);
  }
  if (pages.length) {
    paginationElement = (
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={classnames(
              { disable: page == current },
              'pagination__item'
            )}
            onClick={props.onChange && props.onChange.bind(null, page)}
          >
            <span>{page + 1}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <nav className="pagination-wrapper">
      <div className="pagination-info">
        {i18n.page}&nbsp;&nbsp;
        {(current && current + 1) || 1} / {totalPage}
      </div>
      {paginationElement}
    </nav>
  );
};

export default Pagination;
