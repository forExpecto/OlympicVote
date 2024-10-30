<template>
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
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
