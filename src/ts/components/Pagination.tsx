// components/Pagination.tsx
/**
 * 動画検索のページネーションコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { StoreState, youtube } from '~/interfaces';

type Props = RouteComponentProps & {
  search: StoreState['search'];
  searchVideo: (value: { query: string; result: youtube.dataAPI.search.List }) => void;
};

const Pagination: React.FC<Props> = props => {
  const canPrev = props.search.result.prevPageToken !== void 0;
  const canNext = props.search.result.nextPageToken !== void 0 && props.search.result.items.length >= 40;

  /**
   * クリックイベント
   * @param event イベントオブジェクト
   */
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (event.currentTarget.classList.contains('pagination__link-prev')) {
      movePage(props.search.result.prevPageToken);
    } else {
      movePage(props.search.result.nextPageToken);
    }
  };

  /**
   * 前or次ページへ移動
   * @param pageToken YouTubeAPIのpageToken
   */
  const movePage = (pageToken: string) => {
    window.scrollTo(0, 0);
    props.history.push(`/search/${props.search.query}/${pageToken}`);
  };

  return (
    <div className="pagination">
      {canPrev && (
        <a href="" className="pagination__link pagination__link-prev" onClick={handleClick}>
          前へ
        </a>
      )}
      {canNext && (
        <a href="" className="pagination__link pagination__link-next" onClick={handleClick}>
          次へ
        </a>
      )}
    </div>
  );
};

export default withRouter(Pagination);
