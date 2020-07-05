import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { Alert } from "element-ui";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    permissions: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    }
  },

  profile: {
    msg: "操作成功",
    code: 200,
    permissions: ["*:*:*"],
    roles: ["admin"],
    user: {
      searchValue: null,
      createBy: "admin",
      createTime: "2018-03-16 11:33:00",
      updateBy: null,
      updateTime: null,
      remark: "管理员",
      dataScope: null,
      params: {},
      userId: 1,
      deptId: 103,
      userName: "admin",
      nickName: "若依",
      email: "ry@163.com",
      phonenumber: "15888888888",
      sex: "1",
      avatar: "",
      password: "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
      salt: null,
      status: "0",
      delFlag: "0",
      loginIp: "127.0.0.1",
      loginDate: "2018-03-16T11:33:00.000+0800",
      dept: {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        dataScope: null,
        params: {},
        deptId: 103,
        parentId: 101,
        ancestors: null,
        deptName: "研发部门",
        orderNum: "1",
        leader: "若依",
        phone: null,
        email: null,
        status: "0",
        delFlag: null,
        parentName: null,
        children: []
      },
      roles: [
        {
          searchValue: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          dataScope: "1",
          params: {},
          roleId: 1,
          roleName: "管理员",
          roleKey: "admin",
          roleSort: "1",
          status: "0",
          delFlag: null,
          flag: false,
          menuIds: null,
          deptIds: null,
          admin: true
        }
      ],
      roleIds: null,
      postIds: null,
      admin: true
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(res => {
            setToken(res.token);
            commit("SET_TOKEN", res.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(res => {
        //   const user = res.user
        //   const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
        //   if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', res.roles)
        //     commit('SET_PERMISSIONS', res.permissions)
        //   } else {
        //     commit('SET_ROLES', ['ROLE_DEFAULT'])
        //   }
        //   commit('SET_NAME', user.username)
        //   commit('SET_AVATAR', avatar)
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
        const profile = user.profile;
        const userInfo = profile.user;
        const avatar =
          userInfo.avatar == ""
            ? require("@/assets/image/profile.jpg")
            : process.env.VUE_APP_BASE_API + userInfo.avatar;

        if (profile.roles && profile.roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          commit("SET_ROLES", profile.roles);
          commit("SET_PERMISSIONS", profile.permissions);
        } else {
          commit("SET_ROLES", ["ROLE_DEFAULT"]);
        }
        commit("SET_NAME", user.username);
        commit("SET_AVATAR", avatar);
        resolve(profile);
      });
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_PERMISSIONS", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
