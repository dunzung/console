<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-form ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="待办提醒">
            <el-switch
              v-model="pendSwitch"
              @change="handlePendSwitch"
              active-text="启用新版发短信网关"
              inactive-text="启用老版发短信网关"
            />
          </el-form-item>
          <br />
          <el-form-item label="用户下发">
            <el-switch
              v-model="userSwitch"
              @change="handleUserSwitch"
              active-text="用户数据接收和入库同步处理"
              inactive-text="用户数据接收和入库异步处理"
            />
          </el-form-item>
          <br />
          <el-form-item label="机构下发">
            <el-switch
              v-model="deptSwitch"
              @change="handleDeptSwitch"
              active-text="机构数据接收和入库同步处理"
              inactive-text="机构数据接收和入库异步处理"
            />
          </el-form-item>
          <br />
          <el-form-item label="年终总结">
            <el-switch
              v-model="yearTotalSwitch"
              @change="handleYearTotalSwitch"
              active-text="显示个人年终总结页"
              inactive-text="关闭个人年终总结页"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { enableSwitch, getSwitchList } from "@/api/system/cacheswitch";
export default {
  data() {
    let dictNo = "1022";
    getSwitchList(dictNo).then(res => {
      for (const v of res.data) {
        // 短信网关
        if (v.extFields == "on" && v.itemNo == "102201") {
          this.pendSwitch = true;
        }
        // 用户下发
        if (v.extFields == "1" && v.itemNo == "102202") {
          this.userSwitch = true;
        }
        // 机构下发
        if (v.extFields == "1" && v.itemNo == "102203") {
          this.deptSwitch = true;
        }
        if (v.extFields == "" && v.itemNo == "102204") {
        }
      }
    });
    return {
      pendSwitch: false,
      userSwitch: false,
      deptSwitch: false,
      yearTotalSwitch: false,
      pendTitle: "ssssssss"
    };
  },
  qryParams: {
    status: 0
  },
  methods: {
    handlePendSwitch() {
      let data = {
        dictNo: "1022",
        itemNo: "102201",
        extFields: this.pendSwitch ? "on" : "off"
      };
      let switchKey = "portal::gwsms::switch";
      enableSwitch(data, switchKey).then(res => {
        console.log("短信网关切换成功...");
      });
    },
    handleUserSwitch() {
      let data = {
        dictNo: "1022",
        itemNo: "102202",
        extFields: this.userSwitch ? "1" : "0"
      };
      let switchKey = "pdsUserReceiveType";
      enableSwitch(data, switchKey).then(res => {
        console.log("用户下发切换成功...");
      });
    },
    handleDeptSwitch() {
      let data = {
        dictNo: "1022",
        itemNo: "102203",
        extFields: this.deptSwitch ? "1" : "0"
      };
      let switchKey = "pdsDeptReceiveType";
      enableSwitch(data, switchKey).then(res => {
        console.log("机构下发切换成功...");
      });
    },
    handleYearTotalSwitch() {
      let data = {
        dictNo: "1022",
        itemNo: "102204",
        extFields: this.yearTotalSwitch ? "1" : "0"
      };
      let switchKey = "personal::summary::enable";
      enableSwitch(data, switchKey).then(res => {
        console.log("年度总结切换成功...");
      });
    }
  }
};
</script>
