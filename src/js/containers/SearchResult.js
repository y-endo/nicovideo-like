import { connect } from 'react-redux';

import SearchResult from '@/components/SearchResult';

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

export default connect(mapStateToProps, {})(SearchResult);
