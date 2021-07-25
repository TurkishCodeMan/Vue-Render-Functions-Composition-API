const { createApp, onMounted, reactive, ref, h, unmounted, computed, watchEffect } = Vue

const Mouse = {

    data() {
        return {
            x: 0,
            y: 0,
        }
    },
    methods: {
        showCoords(e) {
            this.x = e.pageX;
            this.y = e.pageY;
        }
    },
    mounted() {
        window.addEventListener("mousemove", this.showCoords);
    },
    unmounted() {
        window.removeEventListener("mousemove", this.showCoords)
    },

    render() {
        //Equals <slot :x="x" :y="y"></slot>
        return this.$slots.default && this.$slots.default({
            x: this.x,
            y: this.y
        })
    }

}
/*
    Higher Order componente göre daha avantajlıdır hangi mülk hangi componentden
    geldi apaçık ortada

    Belirsiz Enjeksiyon ve ad çakışması sorunu çözüldü

    Burada tek dezavantaj birden çok bileşen örneği oluşturuyoruz
    mantık çıkarma ve reuse uğruna.

    Vue3 Composition API ile onuda çözeriz


*/


const App = {
    template: `<Mouse #default="{x,y}">{{x}} {{y}}</Mouse>`,
    components: { Mouse }
}


createApp(App).mount('#app')

