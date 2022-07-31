<script lang='ts' setup>
import Toast from '@vant/weapp/dist/toast/toast'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import loverImg from './lover.png'
import normalImg from './img.png'
import { useFormValidate } from './use-formValidate'
import { useAuthStore } from '@/store/auth.store'
import StatusBar from '@/components/status-bar/status-bar.vue'
import { uesLoverStore } from '@/store/lover.store'

const { validate, form } = useFormValidate()

const authStore = useAuthStore()
const loverStore = uesLoverStore()

const isLover = ref(false)

onLoad((query) => {
  isLover.value = !!query?.lover
})

const fieldProps = computed(() => (isLover.value
  ? {
      studentId: '请输入Ta的学号',
      password: '请输入Ta的信息门户密码',
    }
  : {
      studentId: '请输入学号',
      password: '请输入信息门户密码',
    }))

const loverLogo = computed(() => (isLover.value ? loverImg : normalImg))

async function onLogin() {
  if (validate()) {
    Toast.loading({
      duration: 0,
      message: isLover.value ? '正在登录Ta的信息门户，不要急\n(๑•ᴗ•๑)♡' : '第一次登录会花些时间，请耐心等待...\n(๑•̀ㅂ•́)و✧',
      forbidClick: true,
    })

    const loginDto = { studentId: form.username, password: form.password }

    if (isLover.value) {
      await loverStore.loverLogin(loginDto)
    } else {
      authStore.login(loginDto)
    }
  }
}

function toDisclaimers() {
  uni.navigateTo({
    url: '/sub1/pages/mine/about/disclaimers/disclaimers',
  })
}
</script>

<template>
  <StatusBar />
  <van-toast id="van-toast" />
  <van-notify id="van-notify" />
  <div class="login-page relative min-h-screen">
    <div class="login-page-header">
      <img
        class="logo object-cover"
        :class="isLover ? 'lover-img' : ''"
        :src="loverLogo"
      >
    </div>

    <div class="mt-10 flex flex-col gap-2">
      <van-notice-bar
        wrapable
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        text="忘记密码的话可以去信息门户重置一下噢"
      />
      <van-notice-bar
        wrapable
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        text="密码输错太多次是会被教务那边冻结五分钟的噢"
      />
    </div>
    <div class="form">
      <div class="username">
        <van-field
          clearable
          type="number"
          left-icon="user-circle-o"
          :placeholder="fieldProps.studentId"
          :values="form.username"
          @change="(e) => form.username = e.detail"
        />
      </div>

      <div class="password">
        <van-field
          type="password"
          left-icon="shield-o"
          :placeholder="fieldProps.password"
          @change="(e) => form.password = e.detail"
        />
      </div>

      <div class="mt-5 btn bg-blue-500 shadow-lg shadow-blue-500/50" @click="onLogin">
        登录
      </div>
    </div>
    <p class="text-center text-blue-500 underline text-sm mt-10" @click="toDisclaimers">
      用户协议
    </p>
    <p class="absolute bottom-16 text-xs text-gray-500 mt-20">
      登录遇到了问题？可以加入交流群656140321问问 {{ getRandomQAQ('happy')[0] }}
    </p>
  </div>
</template>

<style lang='scss' scoped>
.lover-img {
  @apply w-[200px] h-[200px];
}
.login-page {
  width: 95vw;
  margin-left: 2.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    object-fit: cover;
  }

  .form {
    margin-top: 10px;
    width: 100%;
    .password {
      margin-top: 15px;
    }
  }
}

</style>
