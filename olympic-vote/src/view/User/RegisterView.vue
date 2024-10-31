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
        async register() {
            try {
                // 创建 form-data 格式的数据
                const formData = new FormData();
                formData.append('phone', this.registerForm.phone);
                formData.append('password', this.registerForm.password);
                formData.append('username', this.registerForm.username);
                formData.append('address', this.registerForm.address);
                formData.append('email', this.registerForm.email);

                // 发送注册请求
                const response = await axios.post('/api/user/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.code === 0) {
                    alert('注册成功！');
                    // 清空表单
                    this.resetForm();
                } else {
                    console.error('注册失败:', response.data.message);
                    alert('注册失败：' + response.data.message);
                }
            } catch (error) {
                console.error('注册请求出错:', error);
                alert('注册请求出错，请检查网络连接');
            }
        },
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
