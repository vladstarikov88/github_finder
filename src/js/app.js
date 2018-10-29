/* Описание компонента для представления коммита */
Vue.component('my-commit', {
    template: `
    <div class="commit"> 
        <p class="commit__head">{{ iteration }}: <a @click="showCommit(commit)">{{ commit.message }}</a></p>
        <transition name="fade">
            <div 
                class="commit__info" 
                v-if="show">
                <ul class="lsn">
                    <li>Author: {{ commitInfo.author.name }}</li>
                    <li>E-mail: {{ commitInfo.author.email }}</li>
                    <li>Date: {{ getDate() }}</li>
                    <li>Time: {{ getTime() }}</li>
                    <li>Message: {{ commitInfo.message }}</li>
                    <li><a :href="commitInfo.url">Get more info</a></li>
                </ul>
            </div>
        </transition>
    </div>`,
    props: ['commit', 'iteration'], 
    data: function() {
        return {
            show: false,
            commitInfo: {}
        }
    },
    methods: {
        showCommit(data) {
            this.commitInfo = data;
            this.show === false ?
                this.show = true : 
                this.show = false;
        },
        getDate() {
            return this.commitInfo.author.date.split('T')[0];
        },
        getTime() {
            let time = this.commitInfo.author.date.split('T')[1];
            return time.slice(0, time.length - 1);
        }
    }
})

/* Описание основного компонента приложения */
let fa = new Vue({
    el: "#finder_app",
    data(){
        return {
            userName: 'vladstarikov88',
            userRepo: 'broutonlab',
            client_id: "Iv1.5ff6e60e5734c7f1",
            clinent_secret: "34bba2638e8f3e8aa5bfa7c5c00a4709a7f7c3ac",
            userInfo: {
                name: '',
                bio: '',
                location: '',
                url: ''
            },
            commitsInfo: [],
            commitInfo: {},
            selectedCommitShow: false,
            show: {
                user: false,
                commits: false
            }
        }
    },
    methods: {
        searchUser() {
            this.fetchUser(this.userName).then((res) => {
                this.userInfo = objsCopy(res, this.userInfo);

                console.log(res);
                this.show.user = true;
            });
        },
        searchRepo() {
            this.fetchRepo(this.userName, this.userRepo).then((res) => {
                this.commitsInfo = res;

                console.log(res);
                this.show.commits = true;
            });
        },

        /* Функции-запросы */
        fetchUser: async (user) => {
            const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&clinent_secret=${this.clinent_secret}`);
            
            const data = await api_call.json();
            return data ;
        },
        fetchRepo: async (user, repo) => {
            const api_call = await fetch(`https://api.github.com/repos/${user}/${repo}/commits?client_id=${this.client_id}&clinent_secret=${this.clinent_secret}`);

            const data = await api_call.json();
            return data;
        }
    }
})