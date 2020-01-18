// components/SearchForm.tsx
/**
 * 動画を検索するフォームコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import fetchYouTubeSearch from '~/utils/fetchYouTubeSearch';
import { youtube } from '~/interfaces';

type Props = RouteComponentProps<{ query: string; pageToken: string }> & {
  setSearchIsLoading: (value: boolean) => void;
  searchVideo: (value: { query: string; result: youtube.dataAPI.search.List }) => void;
};

const SearchForm: React.FC<Props> = props => {
  const input = React.useRef<HTMLInputElement>(null);

  /**
   * componentDidMount
   */
  React.useEffect(() => {
    const searchQuery = props.match.params.query;
    const pageToken = props.match.params.pageToken || '';

    // URLに検索クエリが含まれている場合は検索を実行する。
    if (searchQuery && searchQuery !== '') {
      input.current!.value = searchQuery;
      search(searchQuery, pageToken);
    }
  }, []);

  /**
   * componentDidUpdate
   */
  React.useEffect(() => {
    // URLのqueryかpageTokenが変わったらデータ更新
    const searchQuery = props.match.params.query;
    const pageToken = props.match.params.pageToken || '';

    // URLに検索クエリが含まれている場合は検索を実行する。
    if (searchQuery && searchQuery !== '') {
      input.current!.value = searchQuery;
      search(searchQuery, pageToken);
    }
  }, [props.match.params.query, props.match.params.pageToken]);

  /**
   * 検索のサブミットイベント
   * @param event イベントオブジェクト
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const value = input.current!.value;

    if (value === '') return;
    props.history.push(`/search/${value}`);
  };

  /**
   * 動画の検索
   * @param value 検索する文言
   * @param pageToken YouTubeAPIのpageToken
   */
  const search = async (value: string, pageToken: string = '') => {
    props.setSearchIsLoading(true);
    const result = await fetchYouTubeSearch(value, pageToken).then(json => json);
    props.setSearchIsLoading(false);

    if (result.error) return;

    props.searchVideo({
      query: value,
      result
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input type="text" className="search-form__input" ref={input} />
      <button className="search-form__button">検索</button>
    </form>
  );
};

export default withRouter(SearchForm);
