<script setup lang="ts">
// Importing necessary components and functions
import { FilterMatchMode, FilterOperator } from 'primevue/api';

// Destructuring functions from the useFavorite composable
const { addFavorite, removeFavorite, getAllFavorites, isInFavorite } = useFavorite();

// Declaring reactive variables and props
const filters = ref();
const error: Ref<Error | null> = ref(null);

// Initializing filters
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

// Calling initFilters to initialize filters
initFilters();

// Function to clear filters
const clearFilter = () => {
    initFilters();
    props.clearFilter();
}

// Function to toggle favorite status
const toggleFavorite = (university) => {
    const result = isInFavorite(university);
    if (result) {
        university.favorite = true;
        return true;
    }
    else {
        university.favorite = false;
        return false;
    }
}

// Function to add or remove from favorites
const addToFavorites = async (university) => {
    if (props.parentComponnent === "search") {
        if (university.favorite)
            removeFavorite(university)
        else
            addFavorite(university);
        
        university.favorite = !university.favorite;
        props.rmFavorite(university)
    }
    else
        props.rmFavorite(university)
}

// Exposing props for data and fields
const props = defineProps({
    filteredUniversities: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        required: true,
    },
    parentComponnent: {
        type: String,
        required: true,
    },
    clearFilter: {
        type: Function,
        required: true
    },
    rmFavorite: {
        type: Function,
        required: true
    }
});

// Destructuring props
const { filteredUniversities, loading } = props;

// Watching props for changes
watch(() => props.filteredUniversities, () => { console.log('prop filteredUniversities changed') });
watch(() => props.loading, () => { console.log('prop loading changed') });
watch(() => props.parentComponnent, () => { console.log('prop parent changed') });

</script>

<template>
    <!-- Data Table component -->
    <DataTable :value="props.filteredUniversities" 
               v-model:filters="filters" 
               dataKey="name"
               paginator 
               :rows="5" 
               :rowsPerPageOptions="[5, 10, 20, 50]"
               :globalFilterFields="['name']" 
               :loading="loading"
               resizableColumns 
               columnResizeMode="fit"
               showGridlines 
               tableStyle="min-width: 50rem">
        <!-- Header template -->
        <template #header>
            <div class="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                <IconField iconPosition="left">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value"  type="text" placeholder="Keyword Search" />
                </IconField>
            </div>
        </template>
        
        <!-- Empty template -->
        <template #empty> No universities found. </template>
        
        <!-- Columns -->
        <Column sortable  field="name" header="Name"></Column>
        <Column sortable  field="web_pages" header="Website">
            <template #body="slotProps">
                <Tag :value="slotProps.data.web_pages.join(',   ')" severity="info"  />
            </template>
        </Column>
        <Column sortable  field="state-province" header="State/Province">
            <template #body="slotProps">
                    {{ !!slotProps.data['state-province'] ? slotProps.data['state-province'] : slotProps.data['country'] }}
            </template>
        </Column>
        <Column field="name" header="Actions">
            <template #body="slotProps">
                <!-- Button to add/remove from favorites -->
                <Button @click="addToFavorites(slotProps.data)" 
                        label="Remove from Favorites" 
                        :severity="slotProps.data.favorite ? 'danger' : 'success'" 
                        rounded>
                    {{ toggleFavorite(slotProps.data) ? 'Remove from Favorites' : 'Add to Favorites' }}
                </Button>
            </template>
        </Column>
    </DataTable>
</template>


