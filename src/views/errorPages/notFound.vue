<template>
    <div class="pt7%">
        <div class="notFound mx-auto max-w-170 min-h45 bg-contain bg-right bg-no-repeat pr205px">
            <img class="w14.5" src="@/assets/logo.svg" alt="logo">
            <p>
                <b>404.</b>
                <ins>That's an error.</ins>
            </p>
            <p>
                The requested URL <code>{{ route.path }}</code> was not found on this server. <ins>That's all we know.</ins>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss">
.notFound {
    background-image: url('@/assets/errorPages/robot.png');

    p {
        margin: 11px 0 22px;
    }

    ins {
        color: #777;
    }
}
</style>