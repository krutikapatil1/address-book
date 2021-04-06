<template>
<transition name="slide-fade">
    <div class="flyout-backdrop" @click.self="close">
        <div class="flyout">
            <header class="flyout-header">
                <slot name="header">This is the default title!</slot>
            </header>
            <section class="flyout-body">
                <slot name="body">
                    This is the default body!
                </slot>
            </section>
            <div class="footer">
                <button v-if="displayCancelButton" class="btn btn-warning btn-sm" @click="cancel">{{cancelButtonText}}</button>
                <button class="btn btn-success btn-sm" @click="close">{{confirmButtonText}}</button>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    name: 'Flyout',
    props: ['confirmButtonText', 'cancelButtonText', 'displayCancelButton'],
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.flyout-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.flyout {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    border-radius: 10px;
}

.flyout-header {
    padding: 20px;
    background: #0052A5;
    position: relative;
    color: #FFFFFF;
    justify-content: space-between;
    text-align: start;
}

.footer {
    padding: 0 20px 20px 20px;
    text-align: right;
}

.flyout-body {
    padding: 20px 20px 0 20px;
    position: relative;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 1;
}
</style>