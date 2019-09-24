import { ActionTypes } from "./actionTypes";
import { createOptions, LoadingState } from "../utils";

const initState = {
  apiData: [],
  album: "",
  song: "",
  audioSrc: "",
  songs: [],
  options: [{ value: "", label: "All albums" }],
  loadingState: LoadingState.NO_REQUEST
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DATA_REQUEST: {
      const { loadingState } = action.payload;

      return { ...state, loadingState };
    }
    case ActionTypes.GET_DATA_SUCCESS: {
      const { data, searchQuery, loadingState } = action.payload;
      const songs = data.filter(
        track => track.artistName.toLowerCase() === searchQuery.toLowerCase()
      );
      const albums = [...new Set(songs.map(item => item.collectionName))];
      const options = [...initState.options, ...createOptions(albums)];
      return {
        ...initState,
        songs,
        options,
        loadingState
      };
    }
    case ActionTypes.SET_ALBUM: {
      return { ...state, album: action.payload };
    }
    case ActionTypes.PLAY_SONG: {
      return { ...state, audioSrc: action.payload };
    }
    case ActionTypes.SET_SONG: {
      return { ...state, song: action.payload };
    }
    default:
      return state;
  }
};
export default reducer;
