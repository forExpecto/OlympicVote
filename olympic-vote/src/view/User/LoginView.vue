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
                    <el-button @click="gotoRegister">注册</el-button>
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
                username: '',
                password: ''
            }
        };
    },
    methods: {
        gotoRegister() {
            this.$router.push('/RegisterView');
        },
        async login() {
            try {
                // 创建 form-data 格式的数据
                const formData = new FormData();
                formData.append('username', this.loginForm.username);
                formData.append('password', this.loginForm.password);

                // 发送请求，使用 form-data 格式
                const response = await axios({
                    method: 'post',
                    url: '/api/user/login',
                    data: formData, // 使用 formData 作为请求体
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.code === 0) {
                    console.log('登录成功:', response.data.message);

                    this.$router.push('/VoteView'); // 跳转到投票页面
                    const token = response.data.data; // 保存 token
                    localStorage.setItem('token', token); // 将 token 存储到 localStorage
                } else {
                    console.error('登录失败:', response.data.message);
                }
            } catch (error) {
                console.error('登录请求出错:', error);
            }
        },
        async getUserInfo() {
            try {
                // 从 localStorage 中获取 token
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token 不存在，请先登录');
                }
                // 使用 token 获取用户信息
                const response = await axios({
                    method: 'get',
                    url: '/api/user/info',
                    headers: {
                        'Authorization': token
                    }
                });
                if (response.data.code === 0) {
                    this.userInfo = response.data.data;
                    console.log('用户信息获取成功:', this.userInfo);


                    const userData = response.data.user;
                    const userDataString = JSON.stringify(userData);

                    // 将用户数据存储在 localStorage 中
                    localStorage.setItem('userData', userDataString);
                    console.log('用户信息保存成功')


                    // 跳转到投票页面
                    this.$router.push('/VoteView');

                } else {
                    console.error('获取用户信息失败:', response.data.message);
                }
            } catch (error) {
                console.error('获取用户信息请求出错:', error);
            }
        },




        resetForm() {
            // 重置表单
            this.$refs.loginForm.resetFields();
        },
        async makeAuthenticatedRequest() {
            try {
                // 从 localStorage 中获取 token
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token 不存在，请先登录');
                }
                // 示例：携带 token 进行授权请求
                console.log('即将发送请求到:', '/api/users');
                const response = await axios({
                    method: 'get',
                    url: '/api/users',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('请求成功:', response.data);
            } catch (error) {
                console.error('请求出错:', error);
            }
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
    background-image: url('@/assets/Login/background1.jpg');
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
