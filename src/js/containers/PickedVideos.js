import { connect } from 'react-redux';
import { setPickedIsLoaded, loadVideoWithComments } from '@/actions';

import PickedVideos from '@/components/PickedVideos';

const mapStateToProps = state => {
  return {
    pickedVideos: state.pickedVideos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPickedIsLoaded: value => dispatch(setPickedIsLoaded(value)),
    loadVideoWithComments: value => dispatch(loadVideoWithComments(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickedVideos);
