<template>
    <div class="d-flex align-items-start vstack gap-4">
        <div class="container nav flex-row nav-pills d-flex justify-content-center" role="tablist" id="tabs" >
            <button v-for="(item, index) in items" :key="item.name" class="nav-link text-start px-4 mx-4" 
                :class="index === 0 ? ' active' : ''" :id="`${item.name}-tab`" data-bs-toggle="pill" :data-bs-target="`#${item.name}`" 
                type="button" role="presentation" :aria-controls="item.name" @click="currentTab = item.form" :aria-selected="index === 0 ? 'true' : 'false'">
                {{ item.name.slice(0,1).toUpperCase() + item.name.slice(1, item.name.length) }}
            </button>
        </div>
        <div class="tab-content w-100" id="content">
            <div v-for="(item, index) in items" :key="item.name" class="tab-pane fade show" :class="index === 0 ? ' active' : ''" :id="item.name" role="tabpanel" :aria-labelledby="`${item.name}-tab`">
                <div class="px-5 container-fluid d-flex align-items-start vstack">
                    <div class="fs-2 fw-bold">{{ item.name.slice(0,1).toUpperCase() + item.name.slice(1, item.name.length) }}</div>
                    <div style='width: 10%;'>
                        <hr />
                    </div>
                    <component :is="item.form" :class="item.name"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BrowseForm from '@/components/forms/BrowseForm'
import ReadForm from '@/components/forms/ReadForm'
import EditForm from '@/components/forms/EditForm'
import AddForm from '@/components/forms/AddForm'
import DeleteForm from '@/components/forms/DeleteForm'
export default {
    name: 'MenuNav',
    components: {
        BrowseForm,  
        ReadForm,
        EditForm, 
        AddForm, 
        DeleteForm, 
    },
    data() {
        return {
            currentTab: 'BrowseForm',
            items: [
                {name: 'browse', form: 'BrowseForm'}, 
                {name: 'read', form: 'ReadForm'}, 
                {name: 'edit', form: 'EditForm'}, 
                {name: 'add', form: 'AddForm'}, 
                {name: 'delete', form: 'DeleteForm'}, 
            ]
        }
    }
}
</script>

<style>

</style>