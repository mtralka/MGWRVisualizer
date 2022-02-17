<script setup>
import { indexPage, title } from "../assets/info.json";


</script>
<template>

<div
    display="flex" flex="col"
    justify="start"
    space="y-3"
    p="x-15"
    >
    <div
    display="flex"
    flex="col md:row"
    justify="center"
    >
        <h1
        text="4xl"
        font="bold"
        >
            {{title}}
        </h1>
        <p>your emial here</p>

    </div>

    <div
        display="flex"
        flex="col md:row"
        justify="evenly"
        align="items-center"
        space="x-6"
    >
       <p
        text="justify 2xl"
        p="x-3"
        font="light"
       >
            {{indexPage.summary}}
       </p>
    
        <img src="https://via.placeholder.com/300"/>

    </div>

</div>





</template>