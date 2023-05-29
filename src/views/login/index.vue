<template>
    <div class="login full flex-center bg-cover bg-no-repeat">
        <div class="h94vh w96vw flex items-center justify-evenly bg-white opacity-80">
            <!-- 左边 form -->
            <div class="w105 rounded-10px bg-white p10 drop-shadow-xl">
                <div class="my7.5 flex-center">
                    <img class="w14.5" src="@/assets/logo.svg" alt="logo">
                    <p class="whitespace-nowrap pl5 text-10">
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
            <div class="rightBg hidden h60% w40% bg-cover bg-no-repeat md:block" />
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue'
import { captchaApi } from '@/api/modules/system'
import type { FormInstance, FormRules } from 'element-plus'

import { loginApi } from '@/api/modules/login'
import type { Login } from '@/api/modules/login'

import { initDynamicRouter } from '@/routers/modules/dynamicRouter'

import { main } from '@/stort/modules/main'
import { useRouter } from 'vue-router'

const router = useRouter()
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
    if (!loginForm.value) return
    loginForm.value?.resetFields()
}

const submitForm = async () => {
    if (!loginForm.value) return
    loginForm.value.validate(async (valid) => {
        if (valid) {
            isLoading.value = true
            try {
                const res = await loginApi(formData)
                mainStore.token = res.data.token

                // 2.添加动态路由
                await initDynamicRouter()

                router.push({ name: 'layout' })
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