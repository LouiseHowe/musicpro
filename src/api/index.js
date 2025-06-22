import Axios from "axios";
import { get, post } from "./http";
export const songBySongId = (id) => get(`/song/detail?songId=${id}`);

//下载音乐
export const download = (url) => Axios({
  method: 'get',
  url: url,
  responseType: 'blob'
});