<template>
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
</template>

<script>
export default {
    name: 'UserInfo',
    // props: {
    //     userInfo: {
    //         type: Object,
    //         required: true
    //     }
    // }
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

}
</script>

<style scoped>
.user-info {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.user-info h2 {
    margin-bottom: 10px;
}

.user-info table {
    width: 100%;
    border-collapse: collapse;
}

.user-info td {
    padding: 5px;
    border: 1px solid #ccc;
}
</style>
