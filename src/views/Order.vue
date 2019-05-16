<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs2 mr pr-4>
                <Aside></Aside>
            </v-flex>
            <v-flex xs10>
                <v-card class="pa-4">
                    <v-card-text>jjjl</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Aside from '@/components/order/Aside'
    export default {
        components: {
            Aside
        }
    }
</script>
