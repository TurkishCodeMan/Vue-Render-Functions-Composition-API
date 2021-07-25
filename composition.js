const { createApp, onMounted,toRefs,reactive, ref,h,onUnmounted,computed, watchEffect } = Vue

function useFeature() {
    onMounted(() => console.log("mounted"));
}

function useFeatureA() {
    const foo = ref(0);
    const plusOne = computed(() => foo.value + 1);
    function incrementFoo() { };

    watchEffect(() => {

    })

    return {
        foo, plusOne
    }
}

 function setup(){ //reuse other components in other setup 
    useFeature();

    const { foo, plusOne } = useFeatureA();
     // const { bar } = useFeatureB();
    //const { baz } = useFeatureC();

    return {
        foo,plusOne
    }
}


const Stack = {
   setup
}

function useMouse(){
    const mouseXY=reactive({
        x:0,
        y:0
    })
    window.addEventListener('mousemove',showCoords)

    function showCoords(e){
        mouseXY.x=e.pageX;
        mouseXY.y=e.pageY;
    }

    onUnmounted(()=>{
        window.removeEventListener('mousemove',showCoords);
    })

    return {...toRefs(mouseXY)} //or return {mouseXY} using in compo -> mouseXY.x Reactive Saved !!
}

const Mouse={
    setup(){
        const {x,y}=useMouse();
        return ()=>h('div',{class:'sa'},h('h1',`X:${x.value}---Y:${y.value}`))
    }
}

const App = {
    template: `<Stack/> <Mouse/>`,
    components: { Stack,Mouse }
}


createApp(App).mount('#app')

