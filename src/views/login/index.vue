<template>
    <div class="login bg-no-repeat bg-cover full flex-center">
        <div class="w96vw h94vh bg-white opacity-80 flex items-center justify-evenly">
            <!-- 左边 form -->
            <div class="bg-white w105 p10 rounded-10px drop-shadow-2xl">
                <div class="flex-center my7.5">
                    <img
                        class="w14.5"
                        src="@/assets/vue.svg"
                        alt="logo"
                    >
                    <p class="text-10 pl5 whitespace-nowrap">
                        {{ title }}
                    </p>
                </div>
                <!--  -->
                <el-form
                    ref="loginForm"
                    :model="formData"
                    :rules="rules"
                >
                    <el-form-item
                        prop="userName"
                    >
                        <el-input
                            v-model="formData.userName"
                            placeholder="请输入用户名"
                            size="large"
                            suffix-icon="user"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="passWord"
                    >
                        <el-input
                            v-model="formData.passWord"
                            type="password"
                            show-password
                            size="large"
                            placeholder="请输入密码"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="w46%"
                            type="primary"
                            size="large"
                            icon="CircleClose"
                            @click="cleanForm"
                        >
                            重 置
                        </el-button>
                        <el-button
                            class="w46% !ml8%"
                            type="primary"
                            size="large"
                            icon="UserFilled"
                            :loading="formData.isLoading"
                            @click="submitForm"
                        >
                            登 录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 右边边 图片背景 -->
            <div class="rightBg bg-no-repeat bg-cover w40% h60% hidden md:block" />
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const title: string = import.meta.env.VITE_TITLE

const formData = reactive({
    userName: '',
    passWord: '',
    isLoading: false,
})

const rules = reactive({
    userName: [
        { required: true, message: '请输入正确的用户名', trigger: 'blur' },
        { min: 5, message: '不小于5位数', trigger: 'blur' },
    ],
    passWord: [
        { required: true, message: '请输入正确的密码', trigger: 'blur' },
        { min: 6, message: '不小于6位数', trigger: 'blur' },
    ],
})

const loginForm = ref<FormInstance | null>(null)

const cleanForm = () => {
    formData.userName = ''
    formData.passWord = ''
    formData.isLoading = false
    
    loginForm.value?.resetFields()
}

const submitForm = () => {
    if (!loginForm.value) return
    loginForm.value.validate((valid) => {
        if (valid) {
            formData.isLoading = true
        } else {
            ElMessage.warning('请正确填写表单内容!')
            return false
        }
    })
}
</script>

<style lang="scss">
.login{
    background-image: url("@/assets/login_background.jpg");
    .rightBg{
        background-image: url("@/assets/login_right.png");
    }
}
</style>