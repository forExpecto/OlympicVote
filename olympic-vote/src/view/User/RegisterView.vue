<template>
    <div class="register-container">
        <el-form ref="registerForm" :model="registerForm" label-width="80px">
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
</template>

<script>
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
            console.log('注册表单数据：', this.registerForm);
            // 表单验证通过后，可以调用注册API
            // this.$http.post('/api/register', this.registerForm).then(response => {
            //   // 注册成功后的处理
            // }).catch(error => {
            //   // 注册失败后的处理
            // });
        },
        resetForm() {
            // 重置表单
            this.$refs.registerForm.resetFields();
        }
    }
};
</script>

<style scoped>
.register-container {
    align-items: center;
    justify-content: center;
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
