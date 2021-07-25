
const { createApp, onMounted, toRefs,reactive, ref, h, onUnmounted, computed, watchEffect } = Vue


function useFetch(getUrl) {
    const data = ref(null);
    const error = ref(null);
    const isPending = ref(true);

    //Best Practicesss Post ile ilişkelendirilir Post Destroyed olunca kendiliğinden durur.
    watchEffect(() => {
        isPending.value=true;
        data.value=null;
        error.value=null;
        fetch(getUrl())//Save activiy dependency
            .then(res => res.json())
            .then(_data => {
                setTimeout(() => {
                    data.value = _data;
                    isPending.value = false;
                }, 1000)
            })
            .catch(err => {
                error.value = err;
                isPending.value = false;
            })
    })


    return { data, error, isPending }
}


const Post = {
    props:{
        id:{type:Number,default:0}
    },
    setup(props) {
        console.log(props)
        const { data, error, isPending } = useFetch(() => `https://jsonplaceholder.typicode.com/todos/${props.id}`)
        return () => {
            if (isPending.value) {
                return h('div', { class: 'loading' }, 'Loading ...')
            } if (data.value) {
                return h('div', { class: 'success' }, JSON.stringify(data.value));
            } if (error.value) {
                return h('div', { class: 'error' }, 'Error Fetch !')
            }
        }

    }
}

const App={
    components:{Post},
    setup(){
        const id=ref(1);
        function increment(){
            id.value++;
        }
        return ()=>h('div',[
            h(Post,{
                id:id.value
            }),
            h('button',{
                class:'btn',
                onClick:increment
            },'Change')
        ])
    }
}


createApp(App).mount('#app')