<template>
    <div class="w-100">
        <div class="px-5 container-fluid d-flex align-items-start vstack">
            <div class="fs-2 fw-bold">Browse</div>
            <div style='width: 10%;'><hr /></div>
            <suspense>
                <BrowseForm class='browse'/>
            </suspense>
        </div>
    </div>
</template>

<script>
import BrowseForm from '@/components/forms/BrowseForm'
export default {
    name: 'BrowseView',
    components: {
        BrowseForm
    }
}
</script>

<style>

</style>