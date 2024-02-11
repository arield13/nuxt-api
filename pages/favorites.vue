<script setup lang="ts">
// Importing necessary components and functions
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useToast } from "primevue/usetoast";

// Initializing toast
const toast = useToast();

// Destructuring functions from the useFavorite composable
const { addFavorite, removeFavorite, getAllFavorites, isInFavorite } = useFavorite();

// Initializing reactive variables and props
const loading = ref(true);
const filters = ref();
const filteredUniversities = ref([]);

// Function to get universities data
const getUniversities = () => {
    // Fetching universities data from favorites
    loading.value = true;
    filteredUniversities.value = getAllFavorites();
    loading.value = false;
};

// Initializing filters
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

// Function to clear filters
const clearFilter = () => {
    // Resetting filters
    initFilters();
    // Refreshing universities data
    getUniversities();
};

// Function to remove from favorites
const rmFavorite = async (university) => {
    // Removing university from favorites
    removeFavorite(university)
    // Showing success message
    showSuccess(university.name)
    // Refreshing universities data
    getUniversities();
}

// Function to show success message
const showSuccess = (name: string) => {
    // Showing success message using toast
    toast.add({ severity: 'success', summary: name, detail: `Remove from Favourites!`,  life: 3000 });
};

// Initializing data
getUniversities();

</script>
<template>
    <div class="card">
        <!-- Toast component for showing messages -->
        <Toast />
        <!-- Navigation link to Search page -->
        <router-link :to="{ name: 'index' }">Go to Search</router-link>
        <!-- Loading indicator -->
        <div v-if="loading"> Loading </div>
        <!-- Data table component to display favorite universities -->
        <FvDataTable :filteredUniversities="filteredUniversities" :loading="loading" :clearFilter="clearFilter" :rmFavorite="rmFavorite" parentComponnent="favorite"/>
    </div>
</template>
