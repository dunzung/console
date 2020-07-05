import request from "@/utils/request";

const siteApi = process.env.VUE_APP_GW_URL + "/pbm/sys/site";

export function delSiteCache(data) {
  let url = siteApi + "/opi/cache/delete";
  return request({
    url: url,
    method: "post",
    data: data
  });
}
