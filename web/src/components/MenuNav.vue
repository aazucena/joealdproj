<template>
    <div class="container nav flex-row nav-pills d-flex justify-content-center" >
        <router-link v-for="(item, i) in items" v-bind:key="i" :to='item.path' class="btn nav-link text-start px-4 fw-bold mx-4" 
            active-class="active">
            {{ formatString(item.name) }}
        </router-link>
    </div>
</template>

<script>

import { formatString } from '@/utilities/services'

export default {
    name: 'MenuNav',
    data() {
        return {
            items: [
                {name: 'browse', path: '/browse'}, 
                {name: 'read', path: '/read'}, 
                {name: 'edit', path: '/edit'}, 
                {name: 'add', path: '/add'}, 
                {name: 'delete', path: '/delete'}, 
            ],
            formatString
        }
    }
}
</script>

<style>

</style>