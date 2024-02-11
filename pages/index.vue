<script setup lang="ts">
// Importing necessary components and functions
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useToast } from "primevue/usetoast";

// Interface for performance data
interface PerformanceData {
    responseCode: number;
    responseTime: number;
    responseStatus: string;
}

// Base URL for API
const baseUrl: string = "http://universities.hipolabs.com/search";

// Initializing reactive variables and props
const toast = useToast();
const { addFavorite, removeFavorite, getAllFavorites, isInFavorite } = useFavorite();
const loading = ref(false);
const selectedCountry = ref();
const countries = ref([
    { name: 'Canada', value: 'Canada' },
    { name: 'United Arab Emirates', value: 'United Arab Emirates' },
    { name: 'Brazil', value: 'Brazil' },
    { name: 'United States', value: 'United States' },
    { name: 'Spain', value: 'Spain' },
]);
const filters = ref();
const error: Ref<Error | null> = ref(null);
const performanceData: Ref<PerformanceData | null> = ref(null);
const filteredUniversities = ref([]);

// Function to fetch universities data
const getUniversities = async () => {
    // Resetting data and error
    filteredUniversities.value = [];
    error.value = null;
    // Starting performance measurement
    const startTime: number = performance.now();
    loading.value = true;
    // Fetching data from API
    useFetch(baseUrl, {
        method: 'GET',
        params: {
            country: selectedCountry.value?.name ? selectedCountry.value?.name : selectedCountry.value
        }
    }).then(({ data, pending, error, status }) => {
        // Calculating performance metrics
        performanceData.value = {
            responseCode: error?.value?.statusCode ? error.value.statusCode : 200,
            responseStatus: status.value,
            responseTime: performance.now() - startTime,
        };
        // Updating data and loading status
        filteredUniversities.value = [...data.value];
        loading.value = false;
    }).catch((err) => {
        // Handling errors
        console.error('Error fetching data:', err);
        error.value = err;
        loading.value = false;
    }).finally(() => {
        // Finalizing loading status
        loading.value = false;
    })
}

// Initializing filters
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
}

// Function to clear filters
const clearFilter = () => {
    selectedCountry.value.name = 'Canada'; // Assuming you want to reset the selected country to Canada
    initFilters(); // Initializing filters
    getUniversities(); // Fetching universities data
}

// Function to toggle favorite status
const toggleFavorite = (university) => {
    const result = isInFavorite(university);
    if (result) {
        university.favorite = true;
        return true;
    } else {
        university.favorite = false;
        return false;
    }
}

// Function to remove from favorites
const rmFavorite = async (university) => {
    // Showing success message using toast
    showSuccess(university);
}

// Function to show success message
const showSuccess = (university: any) => {
    toast.add({ severity: 'success', summary: university.name, detail: university.favorite ? `Added to Favourites!` : `Remove from Favourites!`, life: 3000 });
}

</script>
<template>
    <!-- Navigation link to favorites page -->
    <div id="link-to-favorite">
        <router-link :to="{ name: 'favorites' }" type="button">
            Go to Favorites
        </router-link> 
    </div>
    
    <!-- Performance tracking -->
    <div v-if="performanceData">
        <Message severity="info"><p>Response Code: {{ performanceData.responseCode }}</p></Message>
        <Message severity="warn"><p>Response Time: {{ performanceData.responseTime }} ms</p></Message>
    </div>
    
    <!-- Select country dropdown -->
    <div id="select-country">
        <Dropdown v-model="selectedCountry" @change="getUniversities()" :options="countries" optionLabel="name" placeholder="Select One" class="p-column-filter" style="min-width: 12rem"/>
    </div>
    
    <!-- Main content -->
    <div class="card">
        <Toast />
        <span v-if="loading">
            <ProgressSpinner style="width: 30px; height: 30px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" text="Loading" />
            Loading
        </span>
        <!-- Data table component -->
        <FvDataTable :filteredUniversities="filteredUniversities" :loading="loading" :clearFilter="clearFilter" parentComponnent="search" :rmFavorite="rmFavorite" />
    </div>
</template>