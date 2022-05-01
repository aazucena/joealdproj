<template>
    <div class="w-100">
        <div class="px-5 container-fluid d-flex align-items-start vstack">
            <div class="fs-2 fw-bold">Read</div>
            <div style='width: 10%;'><hr /></div>
            <suspense>
                <ReadForm class='read'/>
            </suspense>
        </div>
    </div>
</template>

<script>
import ReadForm from '@/components/forms/ReadForm'
export default {
    name: 'ReadView',
    components: {
        ReadForm
    }
}
</script>

<style>

</style>