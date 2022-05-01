<template>
    <div class="w-100">
        <div class="px-5 container-fluid d-flex align-items-start vstack">
            <div class="fs-2 fw-bold">Add</div>
            <div style='width: 10%;'><hr /></div>
            <suspense>
                <AddForm class='add'/>
            </suspense>
        </div>
    </div>
</template>

<script>
import AddForm from '@/components/forms/AddForm'
export default {
    name: 'AddView',
    components: {
        AddForm
    }
}
</script>

<style>

</style>