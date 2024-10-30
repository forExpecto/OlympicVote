<template>
    <div class="user-info-container">
        <el-card class="user-info-card">
            <div class="user-info-header">
                <span class="user-info-title">{{ user.user_name }}</span>
                <el-button type="text" icon="el-icon-edit" @click="editUser"></el-button>
            </div>
            <div class="user-info-content">
                <el-row>
                    <el-col :span="8" class="user-info-label">用户编号：</el-col>
                    <el-col :span="16">{{ user.user_id }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="user-info-label">用户邮箱：</el-col>
                    <el-col :span="16">{{ user.user_email }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="user-info-label">用户手机号：</el-col>
                    <el-col :span="16">{{ user.user_phone }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="user-info-label">用户地址：</el-col>
                    <el-col :span="16">{{ user.user_address }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="user-info-label">用户积分：</el-col>
                    <el-col :span="16">{{ user.user_score }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="user-info-label">用户 IP 地址：</el-col>
                    <el-col :span="16">{{ user.user_ip }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="user-info-label">是否为管理员：</el-col>
                    <el-col :span="16">{{ user.is_admin ? '是' : '否' }}</el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                user_id: '111',
                user_name: '111',
                user_email: '11',
                user_phone: '111',
                user_password: '111',
                user_address: '111',
                user_score: '111',
                user_ip: '111',
                is_admin: false
            }
        };
    },
    methods: {
        editUser() {
            // 在这里处理编辑用户逻辑
            console.log('编辑用户：', this.user);
            // 可以打开一个模态框来编辑用户信息
            // this.$modal.show('edit-user-modal');
        }
    }
};
</script>

<style scoped>
.user-info-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.user-info-card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.user-info-title {
    font-size: 18px;
    font-weight: bold;
}

.user-info-content {
    margin-top: 10px;
}

.user-info-label {
    font-weight: bold;
}
</style>
