<template>
    <div class="w-100">
        <div class="px-5 container-fluid d-flex align-items-start vstack">
            <div class="fs-2 fw-bold">Delete</div>
            <div style='width: 10%;'><hr /></div>
            <suspense>
                <DeleteForm class='delete'/>
            </suspense>
        </div>
    </div>
</template>

<script>
import DeleteForm from '@/components/forms/DeleteForm'
export default {
    name: 'DeleteView',
    components: {
        DeleteForm
    }
}
</script>

<style>

</style>