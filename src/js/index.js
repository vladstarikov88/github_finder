const inputUser = document.querySelector("#searchUser");
const inputRepo = document.querySelector("#searchRepo");

const searchUser = document.querySelector(".searchUser");
const searchRepo = document.querySelector(".searchRepo");

const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");

const client_id = "Iv1.5ff6e60e5734c7f1";
const clinent_secret = "34bba2638e8f3e8aa5bfa7c5c00a4709a7f7c3ac";

const fetchUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&clinent_secret=${clinent_secret}`);

    const data = await api_call.json();

    return data 
};
const showData = () => {
    fetchUsers(inputUser.value).then((res) => {
        console.log(res)
    })
}
searchUser.addEventListener("click", () => {
    showData()
})



const fetchRepos = async (user, repo) => {
    const api_call = await fetch(`https://api.github.com/repos/${user}/${repo}?client_id=${client_id}&clinent_secret=${clinent_secret}`);

    const data = await api_call.json();

    return data
};
const showRepos = () => {
    fetchRepos(inputUser.value, inputRepo.value).then((res) => {
        console.log(res)
    })
}
searchRepo.addEventListener("click", () => {
    showRepos()
})