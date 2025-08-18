<template>
    <el-row>
        <el-col :span="18">
            <el-card>
                <MapContainer></MapContainer>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="des">
                <div>1.累计充电站数量：<el-text type="primary">34个</el-text></div>
                <div>2.单省份最多充电桩：<el-text type="primary">北京(4个)</el-text></div>
                <div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div>
                <div>4.暂无充电站省份：<el-text type="primary">22个</el-text></div>
                <div>5.累计充电站：<el-text type="primary">北京(4个)</el-text></div>
                <div>6.单日营收最高：<el-text type="primary">北京西单充电站</el-text></div>
                <div>7.单日营收最低：<el-text type="primary">南宁青秀山充电站</el-text></div>
                <div>8.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h3>新增站点地图</h3>
                    </div>
                </template>
                <el-form :model="form" style="max-width: 600px;" label-width="85px" :rules="rules" ref="mapRef">
                    <el-form-item label="站点名称：" prop="name">
                        <el-input placeholder="请输入站点名称" v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="站点地址" prop="region">
                        <el-input placeholder="请输入站点地址" v-model="form.region" />
                    </el-form-item>
                    <el-form-item label="经度：" prop="location1">
                        <el-input placeholder="请输入经度" v-model.number="form.location1" />
                    </el-form-item>
                    <el-form-item label="维度：" prop="location2">
                        <el-input placeholder="请输入维度" v-model.number="form.location2" />
                    </el-form-item>
                    <el-form-item label="立即使用：" prop="now">
                        <el-switch v-model="form.now" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                        <el-input placeholder="请输入备注" type="textarea" v-model="form.remarks" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleConfirm">创建</el-button>
                        <el-button @click="resetForm">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import MapContainer from '@/components/map/MapContain.vue';
import { reactive, ref } from 'vue';
import type { FormRules } from 'element-plus';
import type { MapType } from '@/type/map';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus'
const form = reactive({
    name: '',
    region: '',
    location1: 0,
    location2: 0,
    now: false,
    remarks: ''
})
const mapRef = ref<FormInstance>()
const handleConfirm = () => {
    mapRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            ElMessage.success('创建成功，因为是后端数据是模拟的，并不会实际创建')
            resetForm()
        }
    })
}
const resetForm = () => {
    form.name = '',
        form.region = '',
        form.location1 = 0,
        form.location2 = 0,
        form.now = false,
        form.remarks = ''
    if (mapRef.value) {
        mapRef.value.resetFields()
    }
}

const rules = reactive<FormRules<MapType>>({
    name: [
        { required: true, message: "名称不能为空", trigger: "blur" }
    ],
    region: [
        { required: true, message: "地址不能为空", trigger: "blur" }
    ],
    location1: [
        { required: true, message: "经度不能为空", trigger: "blur" },
        { type: 'number', message: "经度必须为数字", trigger: "blur" },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value && (value < -180 || value > 180)) {
                    callback(new Error('经度范围应在-180到180之间'));
                } else {
                    callback();
                }
            }, trigger: "blur"
        }
    ],
    location2: [
        { required: true, message: "维度不能为空", trigger: "blur" },
        { type: 'number', message: "维度必须为数字", trigger: "blur" },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value && (value < -90 || value > 90)) {
                    callback(new Error('纬度范围应在-90到90之间'));
                } else {
                    callback();
                }
            }, trigger: "blur"
        }
    ], remarks: {
        required: true, message: "备注不能为空", trigger: "blur"
    }
})

</script>
<style scoped>
.des {
    line-height: 35px;
}
</style>