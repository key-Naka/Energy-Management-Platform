<template>
    <div class="bg">
        <div class="input">
            <div class="logo nts">
                <img :src="logo" width="70px" height="70px">
                <h1>能源台汽车能源综合管理平台</h1>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
                <el-form-item  prop="name" >
                    <el-input placeholder="请输入用户名" v-model="ruleForm.username" prefix-icon="User"/>
                </el-form-item>
                <el-form-item prop="password" >
                    <el-input placeholder="请输入密码" v-model="ruleForm.password" prefix-icon="Lock" type="password"/>
                </el-form-item>
                <el-button type="primary" @click="submitForm" style="width: 100%;">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import logo from '@/assets/logo.png'
import { reactive, ref} from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import {useUserStore} from '@/store/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const UserStore = useUserStore()
interface RuleForm {
    username: string,
    password: string
}
const ruleForm = reactive<RuleForm>({
    username: '',
    password: ''
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 4, max: 8, message: '请输入4~8个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})
const ruleFormRef = ref<FormInstance>()
const submitForm = () => {
    ruleFormRef.value?.validate( async (valid:boolean) => {
        if(valid){
            await UserStore.login(ruleForm)
            router.push('/')
        }
    })
}

</script>
<style lang="less" scoped>
.bg {
    background-image: url('..\assets\bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    
    .input {
        width: 450px;
        height: 250px;
        padding: 50px;
        border: 2px solid #f3f3f5;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 2px 2px 8px #b4b3b3;
        position: absolute;
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -20px;
            margin-bottom: 35px;

            h1 {
                color: #19279e;
                font-size: 30px;
                padding-left: 20px;

            }
        }
    }
}
</style>