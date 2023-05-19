<template>
    <div class="bg-no-repeat full flex-center login bg-cover">
        <div class="flex w96vw h94vh bg-white opacity-80 items-center justify-evenly">
            <!-- 左边 form -->
            <div class="bg-white w105 p10 rounded-10px drop-shadow-xl">
                <div class="flex-center my7.5">
                    <img class="w14.5" src="@/assets/logo.svg" alt="logo">
                    <p class="text-10 pl5 whitespace-nowrap">
                        {{ title }}
                    </p>
                </div>
                <!--  -->
                <el-form ref="loginForm" :model="formData" :rules="rules" @keyup.enter="submitForm">
                    <el-form-item prop="username">
                        <el-input v-model="formData.username" placeholder="请输入用户名" size="large" suffix-icon="user" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="formData.password" type="password" show-password size="large"
                            placeholder="请输入密码"
                        />
                    </el-form-item>
                    <el-form-item
                        v-if="captchaConfig.openCaptcha"
                        prop="captcha"
                        :rules="[
                            { required: true, message: '验证码格式不正确', trigger: 'blur' },
                            { max: captchaConfig.captchaLength, min: captchaConfig.captchaLength, message: `请输入${captchaConfig.captchaLength}位验证码`, trigger: 'blur' },
                        ]"
                    >
                        <div class="flex justify-between">
                            <el-input
                                v-model="formData.captcha"
                                class="pr5" size="large"
                                placeholder="请输入验证码"
                            />
                            <img class="w33%" :src="captchaConfig.picPath" alt="captcha" @click="captcha">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w46%" type="primary" size="large" icon="CircleClose" @click="cleanForm">
                            重 置
                        </el-button>
                        <el-button
                            class="w46% !ml8%" type="primary" size="large" icon="UserFilled" :loading="isLoading"
                            @click="submitForm"
                        >
                            登 录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 右边边 图片背景 -->
            <div class="bg-no-repeat bg-cover rightBg w40% h60% hidden md:block" />
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue'
import type { Login } from '@/api/modules/login'
import { captchaApi } from '@/api/modules/system'
import type { FormInstance, FormRules } from 'element-plus'

import { main } from '@/stort/modules/main'
const mainStore = main()


const title: string = import.meta.env.VITE_TITLE

const isLoading = ref<boolean>(false)
const formData = reactive<Login.ReqLoginForm>({
    username: '',
    password: '',
    captchaId: '',
    captcha: '',
})

const captchaConfig = reactive({
    picPath: '',
    captchaLength: 0,
    openCaptcha: false,
})

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入正确的用户名', trigger: 'blur' },
        { min: 5, message: '不小于5位数', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入正确的密码', trigger: 'blur' },
        { min: 6, message: '不小于6位数', trigger: 'blur' },
    ],
})

const captcha = async () => {
    const res = await captchaApi()
    captchaConfig.picPath = res.data.picPath
    captchaConfig.openCaptcha = res.data.openCaptcha
    captchaConfig.captchaLength = res.data.captchaLength
    formData.captchaId = res.data.captchaId
}
captcha()

const loginForm = ref<FormInstance | null>(null)

const cleanForm = () => {
    formData.username = ''
    formData.password = ''
    isLoading.value = false

    loginForm.value?.resetFields()
}

const submitForm = () => {
    if (!loginForm.value) return
    loginForm.value.validate(async (valid) => {
        if (valid) {
            isLoading.value = true
            try {
                await mainStore.LoginIn(formData)
            } catch (error) {
                captcha()
            } finally {
                isLoading.value = false
            }
        } else {
            ElMessage.warning('请正确填写表单内容!')
            return false
        }
    })
}
</script>

<style lang="scss">
.login {
    background-image: url("@/assets/login/login_background.jpg");

    .rightBg {
        background-image: url("@/assets/login/login_right.png");
    }
}
</style>