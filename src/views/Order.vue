<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs3 pr-3>
                <Aside/>
            </v-flex>
            <v-flex xs9>
                <v-card>
                    <Main/>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Aside from '@/components/order/Aside/Aside'
    import Main from '@/components/order/Main/Main'
    export default {
        components: {
            Aside,
            Main
        }
    }
</script>
