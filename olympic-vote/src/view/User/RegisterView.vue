<template>
    <div class="background">
        <div class="register-container">
            <el-form ref="registerForm" :model="registerForm" label-width="80px">
                <div class="register-font">注册</div>
                <el-form-item label="用户名">
                    <el-input v-model="registerForm.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="registerForm.user_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="registerForm.user_email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="registerForm.user_phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="registerForm.user_address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">注册</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'URL_ADDRESS'; // 设置后端接口的基础URL
export default {
    data() {
        return {
            registerForm: {
                user_id: '',
                user_name: '',
                user_email: '',
                user_phone: '',
                user_password: '',
                user_address: '',
            }
        };
    },
    methods: {
        register() {
            // 在这里处理注册逻辑
            // 发送注册请求到后端
            axios.post('/api/register', this.registerForm)
                .then(response => {
                    if (response.data.success) {
                        // 注册成功，跳转到登录页面
                        this.$router.push('/LoginView');
                    } else {
                        // 注册失败，显示错误信息
                        this.$message.error(response.data.message);
                        alert('注册失败');
                    }
                })
            console.log('注册表单数据：', this.registerForm);
        },
        resetForm() {
            this.$refs.registerForm.resetFields();
        }
    }
};
</script>

<style scoped>
/* 页面背景设置 */
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

.register-font {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}




/* 注册框样式 */
.register-container {
    max-width: 400px;
    padding: 20px;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.8);
    /* 半透明背景 */
    border-radius: 8px;
    transition: all 0.3s ease;
    /* 平滑过渡效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 初始阴影 */
}

/* 悬停效果 */
.register-container:hover {
    transform: translate(-5px, -5px);
    /* 向左上角浮动 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    /* 增强阴影 */
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
