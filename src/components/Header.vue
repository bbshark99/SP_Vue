<template>
    <div class="header">
        <img src="./../assets/logo.png" />
        <h1>Trading Web Platform</h1>
    </div>
</template>
<script>
export default {
    name: 'Header',
    mounted() {
    },
}
</script>
<style>
.header {
    background-color: rgb(64, 58, 96);
    padding: 20px;
    text-align: left;
    display: flex;
    font-family: cursive;
}
.header img {
    width: 80px;
    margin-right: 20px;
}
</style>