const { createApp, onMounted,reactive, ref,h,unmounted,computed, watchEffect } = Vue

function withMouse(Inner){
    return {
        data(){
            return {
                x:0,
                y:0,
            }
        },
        methods:{
            showCoords(e){
                this.x=e.pageX;
                this.y=e.pageY;
            }
        },
        mounted(){
            window.addEventListener("mousemove",this.showCoords);
        },
        unmounted(){
            window.removeEventListener("mousemove",this.showCoords)
        },

        render(){
            return h(Inner,{
                x:this.x,
                y:this.y
            })
        }
    }
}

const Mouse=withMouse({
    props:["x","y"],
    template:`{{x}} {{y}}`
})

//Bu Çözüm React tarafından uygulanıyor fakat buradakı temel problemden kurtulmuyor.
//Burada birden fazla high order component olabilir ve çok prop olabilir.
//Bu patternide bilelim.Slot kullanırsak daha iyi

const App = {
    template: `<Stack/> <Mouse/>`,
    components: {Mouse }
}


createApp(App).mount('#app')

