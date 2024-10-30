<template>
    <div class="background">
        <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            // 在这里处理登录逻辑
            console.log('登录表单数据：', this.loginForm);
            // 表单验证通过后，可以调用登录API
            // this.$http.post('/api/login', this.loginForm).then(response => {
            //   // 登录成功后的处理
            // }).catch(error => {
            //   // 登录失败后的处理
            // });
        },
        resetForm() {
            // 重置表单
            this.$refs.loginForm.resetFields();
        }
    }
};
</script>

<style scoped>
/* 页面背景 */
.background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/Login/more-background-pic.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 登录框样式 */
.login-container {
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    /* 半透明白色背景 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 登录框浮动和阴影效果 */
.login-container:hover {
    transform: translate(-5px, -5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.el-form-item label {
    font-weight: bold;
    color: #333;
}

.el-input {
    width: 100%;
}

.el-button {
    margin-left: 10px;
}
</style>
