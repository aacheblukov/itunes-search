import { searchSinger } from "../api/itunesAPI";
import { ActionTypes } from "./actionTypes";
import { LoadingState } from "../utils";

export const getDataFromApi = searchQuery => async dispatch => {
  if (!searchQuery.trim()) {
    return;
  }
  dispatch({
    type: ActionTypes.GET_DATA_REQUEST,
    payload: { loadingState: LoadingState.REQUEST }
  });
  const data = await searchSinger(searchQuery);
  dispatch({
    type: ActionTypes.GET_DATA_SUCCESS,
    payload: { data, searchQuery, loadingState: LoadingState.SUCCESS }
  });
};
export const setAlbum = value => ({
  type: ActionTypes.SET_ALBUM,
  payload: value
});
export const setSong = value => ({
  type: ActionTypes.SET_SONG,
  payload: value
});
export const playSong = value => ({
  type: ActionTypes.PLAY_SONG,
  payload: value
});
