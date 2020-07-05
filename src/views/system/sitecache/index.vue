<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <!-- <el-form-item label="用户ID" prop="uid">
      <el-input v-model="user.uid" placeholder="请输入用户ID" size="small" />
    </el-form-item> -->
    <br/>
    <el-form-item label="岗位ID" prop="sid">
      <el-input v-model="user.sid" placeholder="请输入岗位ID" size="small" style="width:30%"/>
      <el-button type="primary" size="small" @click="submit">删除</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { delSiteCache } from "@/api/system/sitecache";
export default {
  data() {
    return {
      user: {
        sid: ""
      },
      rules: {
        sid: [{ required: true, message: "岗位ID不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            siteId: this.user.sid
          };
          delSiteCache(data).then(
            res => {
              console.log(res.data)
              if (res.code === 200) {
                this.msgSuccess(res.data);
              } else {
                this.msgError(res.msg);
              }
            }
          );
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    }
  }
};
</script>
