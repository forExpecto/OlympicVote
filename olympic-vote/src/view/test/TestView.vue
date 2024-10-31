<template>
    <div>
        <button @click="getjson">测试</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsonData: [],
        };
    },
    methods: {
        async getjson() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found");
                }
                const response = await axios.get('URL_ADDRESS', {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjMzMzc0MzIyOTE4MDcxMDkxMiwidXNlcm5hbWUiOiJ4aW5neXVlIn0sImV4cCI6MTczMDM4NTkzNX0.04fEixFn-8itrQQRn8NSIzp9avHR9WBAxBxO66rtXb0'
                    }
                });
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },
    },

}


</script>