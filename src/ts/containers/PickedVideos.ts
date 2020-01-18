// containers/PickedVideos.ts
/**
 * components/PickedVideos.tsxのコンテナ
 * @packageDocumentation
 */

import { connect } from 'react-redux';
import { StoreState, youtube } from '~/interfaces';
import { Dispatch } from 'redux';
import { setPickedIsLoaded, pickVideoWithComments } from '~/actions';

import PickedVideos from '~/components/PickedVideos';

const mapStateToProps = (state: StoreState) => {
  return {
    pickedVideos: state.pickedVideos
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setPickedIsLoaded: (value: boolean) => dispatch(setPickedIsLoaded(value)),
    pickVideoWithComments: (value: youtube.dataAPI.videos.Resource[]) => dispatch(pickVideoWithComments(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickedVideos);
