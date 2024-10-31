<template>
    <div class="page-container">
        <div class="user-info">
            <h2>个人信息</h2>
            <table>
                <tbody>
                    <tr>
                        <td>用户编号</td>
                        <td>{{ userInfo.user_id }}</td>
                    </tr>
                    <tr>
                        <td>用户姓名</td>
                        <td>{{ userInfo.user_name }}</td>
                    </tr>
                    <tr>
                        <td>用户邮箱</td>
                        <td>{{ userInfo.user_email }}</td>
                    </tr>
                    <tr>
                        <td>用户手机号</td>
                        <td>{{ userInfo.user_phone }}</td>
                    </tr>
                    <tr>
                        <td>用户密码</td>
                        <td>{{ userInfo.user_password }}</td>
                    </tr>
                    <tr>
                        <td>用户详细地址</td>
                        <td>{{ userInfo.user_address }}</td>
                    </tr>
                    <tr>
                        <td>用户积分</td>
                        <td>{{ userInfo.user_score }}</td>
                    </tr>
                    <tr>
                        <td>用户ip地址</td>
                        <td>{{ userInfo.user_ip }}</td>
                    </tr>
                    <tr>
                        <td>是否为管理员</td>
                        <td>{{ userInfo.is_admin }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UserInfo',
    data() {
        return {
            userInfo: {
                user_id: 1,
                user_name: '张三',
                user_email: 'EMAIL',
                user_phone: '12345678901',
                user_password: '123456',
                user_address: '北京市朝阳区',
                user_score: 100,
                user_ip: 'IP_ADDRESS',
                is_admin: 0
            }
        }
    },
    getUserInofo() {
        const user_name = localStorage.getItem('user_name');
        const user_password = localStorage.getItem('user_password');
        if (user_name && user_password) {
            // 发送请求到后端，查询用户信息
            axios.get('/api/user', { params: { user_name, user_password } })
                .then(response => {
                    // 将后端返回的用户对象存储在userInfo中
                    this.userInfo = response.data;
                })
                .catch(error => {
                    console.error('获取用户信息失败:', error);
                });
        }
    },

    created() {

    },
    methods: {
        gotoVote() {
            // 跳转到投票页面
            this.$router.push('/VoteView');
        }
    }
}
</script>

<style scoped>
.page-container {
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

.user-info {
    /* 信息框样式 */
    width: 60%;
    background: rgba(255, 255, 255, 0.8);
    /* 半透明白色背景 */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-info h2 {
    margin-bottom: 15px;
    text-align: center;
}

.user-info table {
    width: 100%;
    border-collapse: collapse;
}

.user-info td {
    padding: 10px;
    border: 1px solid #ccc;
}
</style>
