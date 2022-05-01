<template>
    <div class="w-100">
        <div class="px-5 container-fluid d-flex align-items-start vstack">
            <div class="fs-2 fw-bold">Edit</div>
            <div style='width: 10%;'><hr /></div>
            <suspense>
                <EditForm class='edit'/>
            </suspense>
        </div>
    </div>
</template>

<script>
import EditForm from '@/components/forms/EditForm'
export default {
    name: 'EditView',
    components: {
        EditForm
    }
}
</script>

<style>

</style>