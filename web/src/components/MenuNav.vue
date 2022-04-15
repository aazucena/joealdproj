<template>
    <div class="d-flex align-items-start vstack gap-4">
        <div class="container nav flex-row nav-pills d-flex justify-content-center" role="tablist" id="tabs" >
            <button v-for="(item, index) in items" :key="item" class="nav-link text-start px-4 mx-4" :class="index === 0 ? ' active' : ''" :id="`${item}-tab`" data-bs-toggle="pill" :data-bs-target="`#${item}`" 
                type="button" role="presentation" :aria-controls="item" :aria-selected="index === 0 ? 'true' : 'false'">
                {{ item.slice(0,1).toUpperCase() + item.slice(1, item.length) }}
            </button>
        </div>
        <div class="tab-content w-100" id="content">
            <div v-for="(item, index) in items" :key="item" class="tab-pane fade show" :class="index === 0 ? ' active' : ''" :id="item" role="tabpanel" :aria-labelledby="`${item}-tab`">
                <div class="px-5 container-fluid d-flex align-items-start vstack">
                    <div class="fs-2 fw-bold">{{ item.slice(0,1).toUpperCase() + item.slice(1, item.length) }}</div>
                    <div style='width: 10%;'>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuNav',
    data() {
        return {
            items: ['browse', 'read', 'edit', 'add', 'delete']
        }
    }
}
</script>

<style>

</style>