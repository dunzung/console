import request from "@/utils/request";

const dictsApi = process.env.VUE_APP_GW_URL + "/pbm/sys/dicts";

export function enableSwitch(data, switchKey) {
  let url = dictsApi + "/opi/switch/" + switchKey;
  return request({
    url: url,
    method: "put",
    data: data
  });
}

export function getSwitchList(dictNo) {
  let url = dictsApi + "/opi/" + dictNo + "/items";
  return request({
    url: url,
    method: "get"
  });
}
