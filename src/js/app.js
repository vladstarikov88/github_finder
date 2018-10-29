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
            commitInfo: {}
        }
    },
    methods: {
        searchUser() {
            this.fetchUser(this.userName).then((res) => {
                this.userInfo = objsCopy(res, this.userInfo);

                console.log(res)
            })
        },
        searchRepo() {
            this.fetchUser(this.userName).then((res) => {
                this.userInfo = objsCopy(res, this.userInfo);

                console.log(res)
            })
            this.fetchRepo(this.userName, this.userRepo).then((res) => {
                this.commitsInfo = res;
                console.log(res)
            })
        },

        fetchUser: async (user) => {
            const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&clinent_secret=${this.clinent_secret}`);
            
            const data = await api_call.json();
        
            return data 
        },
        fetchRepo: async (user, repo) => {
            const api_call = await fetch(`https://api.github.com/repos/${user}/${repo}/commits?client_id=${this.client_id}&clinent_secret=${this.clinent_secret}`);
            const data = await api_call.json();
        
            return data 
        },
        getCommitInfo(data) {
            this.commitInfo = data;
            console.log(this.commitInfo)
        }
    }
})