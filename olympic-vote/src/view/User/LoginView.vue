<template>
    <div class="background">
        <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" label-width="80px">
                <div class="login-font">奥林匹克系统登录</div>
                <el-form-item label="用户名">
                    <el-input v-model="loginForm.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="loginForm.user_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                    <el-button @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loginForm: {
                user_name: '',
                user_password: ''
            }
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/api/login', this.loginForm);

                if (response.data.success) {
                    // token，保存到 localStorage 中
                    localStorage.setItem('token', response.data.token);



                    // 跳转到投票页面
                    this.$router.push('/VoteView');
                } else {
                    this.$message.error('用户名或密码错误');
                    alert('用户名或密码错误');
                }
            } catch (error) {
                console.error('登录失败:', error);
                this.$message.error('登录失败，请重试');
            }
        },
        resetForm() {
            // 重置表单
            this.$refs.loginForm.resetFields();
        },
        register() {
            // 跳转到注册页面
            this.$router.push('/RegisterView');
        }
    }
};
</script>

<style scoped>
/* 样式代码保持不变 */
.background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/Login/background1.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-font {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

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
